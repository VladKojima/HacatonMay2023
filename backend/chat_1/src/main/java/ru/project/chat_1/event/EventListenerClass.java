package ru.project.chat_1.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import ru.project.chat_1.model.Chat;
import ru.project.chat_1.model.ChatMessage;
import ru.project.chat_1.repository.ChatMessageRepository;
import ru.project.chat_1.repository.ChatRepository;

import java.util.Iterator;

@Component
public class EventListenerClass {
    @Autowired
    private ChatMessageRepository chatMessage;

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;


    @EventListener
    public void chatSubscribe(SessionSubscribeEvent event) {

        String id = ((String) event.getMessage().getHeaders().get("simpDestination")).split("/")[2];

        for (Chat ch : chatRepository.findAllForUser(id)) {
            for (ChatMessage m : chatMessage.findByChatId(ch.id)) {
                simpMessagingTemplate.convertAndSendToUser(id, "queue/messages", m);
            }

        }


    }


}
