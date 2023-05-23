package ru.project.chat_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ru.project.chat_1.connect.AuthService;
import ru.project.chat_1.model.ChatMessage;
import ru.project.chat_1.model.ChatNotification;
import ru.project.chat_1.repository.ChatMessageRepository;
import ru.project.chat_1.repository.ChatRepository;

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

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        System.out.println(chatMessage.toString());

        //headers -> Authorization : Bearer - TOKEN
        // fetch(url, USERID, TOKEN)
        //fetch if(statusCode==401) response 401

        ChatMessage saved = chatMessageRepository.save(chatMessage);
        messagingTemplate.convertAndSendToUser(
                chatRepository.findById(chatMessage.getChatId()).orElse(null).clientId,"/queue/messages",
                saved);
        messagingTemplate.convertAndSendToUser(
                chatRepository.findById(chatMessage.getChatId()).orElse(null).managerId,"/queue/messages",
                saved);

    }

    /*
    @GetMapping("/messages/{senderId}/{recipientId}/count")
    public ResponseEntity<Long> countNewMessages(
            @PathVariable String senderId,
            @PathVariable String recipientId) {

        return ResponseEntity
                .ok(chatMessageService.countNewMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<?> findChatMessages ( @PathVariable String senderId,
                                                @PathVariable String recipientId) {
        return ResponseEntity
                .ok(chatMessageService.findChatMessages(senderId, recipientId));
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<?> findMessage ( @PathVariable String id) {
        return ResponseEntity
                .ok(chatMessageService.findById(id));
    }

     */
}
