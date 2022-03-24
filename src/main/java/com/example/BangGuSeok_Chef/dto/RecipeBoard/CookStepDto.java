package com.example.BangGuSeok_Chef.dto.RecipeBoard;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class CookStepDto {
    private Long recipe_id;

    private Integer step_no;

    private String contents;

    private String image;
}


