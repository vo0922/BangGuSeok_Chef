package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.Member.FollowRecipeDto;
import com.example.BangGuSeok_Chef.service.Member.FollowService;
import com.example.BangGuSeok_Chef.service.RecipeBoard.RecipeBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RecipeFollowController {
    private final FollowService followService;

    // 팔로우 게시글
    @GetMapping("/api/home/recipe/{keyword}")
    public List<FollowRecipeDto> homeFeed(Pageable pageable, @PathVariable String keyword){
        List<FollowRecipeDto> page = followService.view(pageable, keyword);
        return page;
    }

}
