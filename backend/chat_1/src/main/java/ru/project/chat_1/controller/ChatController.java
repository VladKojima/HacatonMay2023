package ru.project.chat_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.WebSocketHttpHeaders;
import ru.project.chat_1.connect.AuthService;
import ru.project.chat_1.model.Chat;
import ru.project.chat_1.model.ChatMessage;
import ru.project.chat_1.model.ChatNotification;
import ru.project.chat_1.model.Manager;
import ru.project.chat_1.repository.ChatMessageRepository;
import ru.project.chat_1.repository.ChatRepository;
import ru.project.chat_1.repository.ManagerRepository;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private ManagerRepository managerRepository;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage, @Header("Authorization") String auth) throws Exception {

        String token = auth.split(" ")[1];

        if(!authService.checkUser(chatMessage.getSenderId(), token)) return;

        chatMessage.setTimestamp(new Date().getTime());

        ChatMessage saved = chatMessageRepository.save(chatMessage);
        messagingTemplate.convertAndSendToUser(
                chatRepository.findById(chatMessage.getChatId()).orElse(null).clientId,"/queue/messages",
                saved);
        messagingTemplate.convertAndSendToUser(
                chatRepository.findById(chatMessage.getChatId()).orElse(null).managerId,"/queue/messages",
                saved);

    }

    @PostMapping("/chat/create")
    public ResponseEntity<String> saveChat(@RequestBody NewChatArg args, @RequestHeader("Authorization") String auth) throws Exception {

        String token = auth.split(" ")[1];

        if(!authService.checkUser(args.clientId, token)) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if(managerRepository.findById(args.clientId).orElse(null)!=null) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        Chat chat = new Chat();

        chat.clientId = args.clientId;

        List<Manager> lstMan = managerRepository.findAllFirstLine();

        Manager manager = lstMan.get(new Random().nextInt(lstMan.size()));

        chat.managerId = manager.id;

        String chatId = chatRepository.save(chat).id;

        ChatMessage firstm = new ChatMessage();

        firstm.setChatId(chatId);
        firstm.setContent(args.firstMessage);
        firstm.setSenderId(args.clientId);

        ChatMessage saved = chatMessageRepository.save(firstm);
        messagingTemplate.convertAndSendToUser(
                args.clientId,"/queue/messages",
                saved);
        messagingTemplate.convertAndSendToUser(
                manager.id,"/queue/messages",
                saved);

        return  ResponseEntity.ok(chatId);
    }

    @PostMapping("/chat/redirect")
    public ResponseEntity<Void> changeManager(@RequestHeader("Authorization") String auth, @RequestBody NewManagerArg args) throws Exception {

        String token = auth.split(" ")[1];

        System.out.println(args.current + " " + args.chatId+ " "+ args.old);

        if(!authService.checkUser(args.old, token)) return ResponseEntity.status(403).build();

        Chat  chat = chatRepository.findById(args.chatId).get();

        //if(chat.managerId!=args.old || chat.managerId == args.current) return ResponseEntity.status(418).build();

        chat.setManagerId(args.current);
        chatRepository.save(chat);
        return  ResponseEntity.status(200).build();
    }

    @PostMapping("/chat/close")
    public ResponseEntity closeChat(@RequestHeader("Authorization") String auth, @RequestBody CloseChatArg args) throws Exception {

        String token = auth.split(" ")[1];

        if(!authService.checkUser(args.managerId, token)) return ResponseEntity.status(403).build();

        Chat  chat = chatRepository.findById(args.chatId).get();

        if(chat.managerId!=args.managerId) return ResponseEntity.status(418).build();

        chat.setManagerId(null);
        chatRepository.save(chat);

        return ResponseEntity.status(200).build();
    }


    private static class NewManagerArg{
        public String old;
        public String current;

        public String chatId;
    }

    private static class NewChatArg{
        public  String clientId;
        public  String firstMessage;
    }
    private static class CloseChatArg{
        public String managerId;
        public String chatId;
    }
}
