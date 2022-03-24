package com.example.BangGuSeok_Chef.dto.RecipeBoard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class ReCommentsDto {
    private Long id;

    private String email;

    private String content;
}
