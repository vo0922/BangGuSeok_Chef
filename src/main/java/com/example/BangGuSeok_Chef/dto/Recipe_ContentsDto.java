package com.example.BangGuSeok_Chef.dto;

import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class Recipe_ContentsDto {
    private Long recipe_id;

    private String introduce;

    private String video;

    private String tag;

    private String tip;

}
