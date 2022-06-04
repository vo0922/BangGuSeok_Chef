package com.example.BangGuSeok_Chef.entity.Member;

import com.example.BangGuSeok_Chef.dto.Member.MemberResponseDto;
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

    private String introduce;

    @Builder
    public Member(String email, String password, Authority authority, String gender, String nickname, String profile, Integer age, String introduce) {
        this.email = email;
        this.password = password;
        this.authority = authority;
        this.gender = gender;
        this.nickname = nickname;
        this.profile = profile;
        this.age = age;
        this.introduce = introduce;
    }

    public Member update(String name, String picture){
        this.nickname = name;
        this.profile = picture;

        return this;
    }

    public Member userUpdate(String nickname, String profile, Integer age, String introduce){
        this.nickname = nickname;
        this.profile = profile;
        this.age = age;
        this.introduce = introduce;

        return this;
    }

    public String getAuthorityKey(){
        return this.authority.getKey();
    }
}
