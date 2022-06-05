package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.Stomp.AlertDto;
import com.example.BangGuSeok_Chef.service.Stomp.StompService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompController {

    private final StompService stompService;

    @MessageMapping("/like")
    public AlertDto like(AlertDto alertDto) {
        stompService.alertByMessage(alertDto);
        return alertDto;
    }
}
