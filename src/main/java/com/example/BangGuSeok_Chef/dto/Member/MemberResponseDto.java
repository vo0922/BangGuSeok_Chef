package com.example.BangGuSeok_Chef.dto.Member;

import com.example.BangGuSeok_Chef.entity.Member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private String email;

    private String gender;

    private String nickname;

    private String profile;

    private Integer age;

    public static MemberResponseDto of (Member member) {

        return new MemberResponseDto(member.getEmail(), member.getGender(), member.getNickname(), member.getProfile(), member.getAge());
    }

}