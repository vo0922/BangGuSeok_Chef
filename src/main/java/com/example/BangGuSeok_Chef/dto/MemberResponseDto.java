package com.example.BangGuSeok_Chef.dto;


import com.example.BangGuSeok_Chef.entity.Authority;
import com.example.BangGuSeok_Chef.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private String email;

    private Long id;

    private String password;

    private Authority authority;

    public static MemberResponseDto SelectUser (Member member) {
        return new MemberResponseDto(member.getEmail(), member.getId(), member.getPassword(), member.getAuthority());
    }

}