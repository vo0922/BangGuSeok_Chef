package com.example.BangGuSeok_Chef.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class SocialMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String picture;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Authority authority;

    @Builder
    public SocialMember(String name, String email, String picture, Authority authority){
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.authority = authority;
    }

    public SocialMember update(String name, String picture){
        this.name = name;
        this.picture = picture;

        return this;
    }

    public String getAuthorityKey(){
        return this.authority.getKey();
    }

}