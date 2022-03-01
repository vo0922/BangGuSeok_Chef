package com.example.BangGuSeok_Chef.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@Slf4j
public class NaverLoginController {

    @GetMapping("naver_callback")
    public List<String> naver_callback() {
        log.info("콜백성공");
        return Arrays.asList("안녕하세요", "Hello");
    }

}
