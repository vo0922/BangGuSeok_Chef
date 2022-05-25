package com.example.BangGuSeok_Chef.dto.Member;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class FollowRecipeDto {
    private Object recipeId;

    private Object title;

    private Object recipeClick;

    private Object recipeDate;

    private Object recipeImage;

    private Object recipeAuthor;

    private Object recommend;

    private Object content;

    private Object authorprofile;

}
