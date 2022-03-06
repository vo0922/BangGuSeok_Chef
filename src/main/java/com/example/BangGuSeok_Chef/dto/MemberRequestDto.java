package com.example.BangGuSeok_Chef.dto;

import com.example.BangGuSeok_Chef.entity.Authority;
import com.example.BangGuSeok_Chef.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberRequestDto {

    private String email;
    private String password;
    private String gender;
    private String nickname;
    private String profile;
    private Integer age;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
<<<<<<< HEAD
                .authority(Authority.ROLE_USER)
                .gender(gender)
                .nickname(nickname)
                .profile(profile)
                .age(age)
=======
                .authority(Authority.USER)
>>>>>>> jaemin_0301
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}