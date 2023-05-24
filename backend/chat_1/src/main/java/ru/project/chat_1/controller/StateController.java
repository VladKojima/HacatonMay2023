package ru.project.chat_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import ru.project.chat_1.connect.AuthService;
import ru.project.chat_1.model.State;
import ru.project.chat_1.repository.StateRepository;

@Controller
public class StateController {

    @Autowired
    StateRepository stateRepository;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    AuthService authService;

    @MessageMapping("/state")
    public void state(@Payload State state, @Header("Authorization") String auth) throws Exception {
        String token = auth.split(" ")[1];

        if(!authService.checkUser(state.userId, token)) return;

        simpMessagingTemplate.convertAndSend("/queue/states", state);
    }

}
