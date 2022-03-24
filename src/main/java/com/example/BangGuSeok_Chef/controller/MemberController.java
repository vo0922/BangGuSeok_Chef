package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.Member.MemberResponseDto;
import com.example.BangGuSeok_Chef.service.Member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class MemberController {
    private final MemberService memberService;

    // 내정보 조회
    @GetMapping("/api/my")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
        return ResponseEntity.ok(memberService.getMyInfo());
    }

    // 유저 조회
    @GetMapping("/api/{email}")
    public ResponseEntity<MemberResponseDto> getMemberInfo(@PathVariable String email) {
        return ResponseEntity.ok(memberService.getMemberInfo(email));
    }

}
