package com.example.BangGuSeok_Chef.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
public class IngredientDto {
    private Long recipe_id;

    private Integer ingredient_no;

    private String title;

    private String amount;

}
