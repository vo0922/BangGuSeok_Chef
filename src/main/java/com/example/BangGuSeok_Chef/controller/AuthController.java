package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.MemberRequestDto;
import com.example.BangGuSeok_Chef.dto.MemberResponseDto;
import com.example.BangGuSeok_Chef.dto.TokenDto;
import com.example.BangGuSeok_Chef.dto.TokenRequestDto;
import com.example.BangGuSeok_Chef.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;
=======
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> jaemin_0301

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
<<<<<<< HEAD
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto) {
=======
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto){
>>>>>>> jaemin_0301
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    @PostMapping("/login")
<<<<<<< HEAD
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto) {
=======
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto){
>>>>>>> jaemin_0301
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    @PostMapping("/reissue")
<<<<<<< HEAD
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }
=======
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto){
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

>>>>>>> jaemin_0301
}
