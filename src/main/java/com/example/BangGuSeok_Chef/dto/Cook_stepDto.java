package com.example.BangGuSeok_Chef.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
public class Cook_stepDto {
    private Long recipe_id;

    private Integer step_no;

    private String contents;

    private String image;

}
