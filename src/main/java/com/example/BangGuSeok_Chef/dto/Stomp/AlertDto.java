package com.example.BangGuSeok_Chef.dto.Stomp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertDto {
    private String sendEmail;
    private String recibeEmail;
    private String message;
    private boolean read;
}
