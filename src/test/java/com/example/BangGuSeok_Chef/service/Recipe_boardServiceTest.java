package com.example.BangGuSeok_Chef.service;

import com.example.BangGuSeok_Chef.dto.Recipe_boardDto;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

@SpringBootTest
class Recipe_boardServiceTest {

    @Autowired Recipe_boardService recipe_boardService;

    @Test
    @Transactional
    void 생성 () {
        String title = "불고기";
        String author = "sinuk@sinuk.com";
        String nickname = "신욱";
        String level = "하";
        String category = "고기";
        Integer click = 0;
        Integer recommend = 0;

        Recipe_boardDto dto = new Recipe_boardDto(title, author, nickname, category, level, click, recommend);

        Recipe_Board recipe_board = recipe_boardService.create(dto);
        System.out.println(recipe_board.toString());
    }
}