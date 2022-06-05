package com.example.BangGuSeok_Chef.service.Stomp;

import com.example.BangGuSeok_Chef.dto.Stomp.AlertDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StompService {

    private final SimpMessageSendingOperations messagingTemplate;

    public void alertByMessage(AlertDto alertDto) {
        messagingTemplate.convertAndSend("/queue" + alertDto.getRecibeEmail(), alertDto);
    }
}
