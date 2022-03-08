package com.example.BangGuSeok_Chef.dto;

import com.example.BangGuSeok_Chef.entity.Member;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String email;

    public SessionUser(Member member){
        this.email = member.getEmail();
    }
}
