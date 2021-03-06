package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.Member.FollowDto;
import com.example.BangGuSeok_Chef.dto.Member.FollowResponseDto;
import com.example.BangGuSeok_Chef.entity.Member.Follow;
import com.example.BangGuSeok_Chef.service.Member.FollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class FollowController {

    private final FollowService followService;

    @PostMapping("/api/follow")
    public Follow follow(@RequestBody FollowDto followDto){

        return followService.follow(followDto);
    }

    @PostMapping("/api/follow/check")
    public ResponseEntity<Boolean> followCheck(@RequestBody FollowDto followDto){
        Boolean followCheck = followService.followCheck(followDto);
        return ResponseEntity.status(HttpStatus.OK).body(followCheck) ;
    }

    @PostMapping("/api/follower")
    public ResponseEntity<List<FollowResponseDto>> getFollower(@RequestBody FollowDto followDto){
        List<FollowResponseDto> dtos = followService.getFollower(followDto);

        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

    @PostMapping("/api/following")
    public ResponseEntity<List<FollowResponseDto>> getFollowing(@RequestBody FollowDto followDto){
        List<FollowResponseDto> dtos = followService.getFollowing(followDto);

        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

}
