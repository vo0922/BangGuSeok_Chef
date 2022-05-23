package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeBoardDto;
import com.example.BangGuSeok_Chef.service.RecipeBoard.RecipeBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RecipeFollowController {
    private final RecipeBoardService recipeBoardService;

    /*
    // 팔로우 게시글
    @GetMapping("/api/home/recipe")
    public List<RecipeBoardDto> index(Pageable pageable){
        List<RecipeBoardDto> page = recipeBoardService.index(pageable);
        return page;
    }
    */

}
