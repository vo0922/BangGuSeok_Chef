package com.example.BangGuSeok_Chef.dto.RecipeBoard;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.Comments;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class CommentsDto {

    private Long id;

    private String email;

    private String content;

}
