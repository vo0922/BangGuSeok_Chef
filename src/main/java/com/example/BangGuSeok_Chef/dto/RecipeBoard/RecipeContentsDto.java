package com.example.BangGuSeok_Chef.dto.RecipeBoard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class RecipeContentsDto {
    private Long recipe_id;

    private String introduce;

    private String video;

    private String tag;

    private String tip;

}
