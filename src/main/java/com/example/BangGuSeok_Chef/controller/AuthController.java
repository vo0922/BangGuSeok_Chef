package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.Member.MemberRequestDto;
import com.example.BangGuSeok_Chef.dto.Member.MemberResponseDto;
import com.example.BangGuSeok_Chef.dto.Member.TokenDto;
import com.example.BangGuSeok_Chef.dto.Member.TokenRequestDto;
import com.example.BangGuSeok_Chef.service.Member.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    // 토큰 재발급
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }
}
