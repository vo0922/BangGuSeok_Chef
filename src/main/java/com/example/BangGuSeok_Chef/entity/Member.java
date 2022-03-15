package com.example.BangGuSeok_Chef.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "member")
@Entity
public class Member {

    @Id
    @Column(name="member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    @Column(length=1)
    private String gender;

    private String nickname;

    private String profile;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Member(String email, String password, Authority authority, String gender, String nickname, String profile, Integer age) {
        this.email = email;
        this.password = password;
        this.authority = authority;
        this.gender = gender;
        this.nickname = nickname;
        this.profile = profile;
        this.age = age;
    }

    public Member update(String name, String picture){
        this.nickname = name;
        this.profile = picture;

        return this;
    }

    public String getAuthorityKey(){
        return this.authority.getKey();
    }
}
