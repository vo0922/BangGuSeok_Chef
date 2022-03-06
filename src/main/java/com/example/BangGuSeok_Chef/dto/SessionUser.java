package com.example.BangGuSeok_Chef.dto;

import com.example.BangGuSeok_Chef.entity.SocialMember;

import java.io.Serializable;

public class SessionUser implements Serializable {
    private String name;
    private String email;
    private String picture;

    public SessionUser(SocialMember socialMember){
        this.name = socialMember.getName();
        this.email = socialMember.getEmail();
        this.picture = socialMember.getPicture();
    }
}
