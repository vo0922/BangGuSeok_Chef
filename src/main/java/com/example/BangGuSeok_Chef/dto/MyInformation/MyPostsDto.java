package com.example.BangGuSeok_Chef.dto.MyInformation;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class MyPostsDto {
    private Long id;

    private String title;

    private LocalDateTime lastupdatedDate;

    private String category;

    private Integer click;

    public static MyPostsDto createMyPostDto(RecipeBoard recipeBoard){
        return new MyPostsDto(
                recipeBoard.getId(),
                recipeBoard.getTitle(),
                recipeBoard.getLastupdatedDate(),
                recipeBoard.getCategory(),
                recipeBoard.getClick()
        );
    }
}


