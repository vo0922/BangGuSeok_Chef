package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.Member.ChefRankDto;
import com.example.BangGuSeok_Chef.service.ChefRank.ChefRankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Pageable;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChefRankController {

    private final ChefRankService chefRankService;

    // 초기, 추천수
    @GetMapping("/api/rank/1")
    public List<ChefRankDto> recommendCount(Pageable pageable) {
        List<ChefRankDto> page = chefRankService.recommend(pageable);

        return page;
    }

    // 조회 수
    @GetMapping("/api/rank/2")
    public List<ChefRankDto> clickCount(Pageable pageable) {
        List<ChefRankDto> page = chefRankService.click(pageable);

        return page;
    }

    // 팔로우 수
    @GetMapping("/api/rank/3")
    public List<ChefRankDto> followCount(Pageable pageable) {
        List<ChefRankDto> page = chefRankService.follow(pageable);

        return page;
    }

    // 쉐프 검색
    @GetMapping("api/rank/search/{keyword}")
    public List<ChefRankDto> search(@PathVariable String keyword){
        List<ChefRankDto> data = chefRankService.search(keyword);

        return data;
    }
}
