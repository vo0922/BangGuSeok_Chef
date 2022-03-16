package com.example.BangGuSeok_Chef.dto;

import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@ToString
public class Recipe_BoardDto {
    private Long id;

    private String title;

    private String author;

    private String nickname;

    private LocalDateTime createDate;

    private LocalDateTime lastupdatedDate;

    private String category;

    private String level;

    private Integer click;

    private Integer recommend;

    @Builder
    public Recipe_BoardDto(String title, String author, String nickname, String category, String level, Integer click, Integer recommend) {
        this.title = title;
        this.author = author;
        this.nickname = nickname;
        this.category = category;
        this.level = level;
        this.click = click;
        this.recommend = recommend;
    }


    public Recipe_Board toEntity() {
        return new Recipe_Board(id, title, author, nickname, createDate, lastupdatedDate,category, level, click, recommend);
    }

}
