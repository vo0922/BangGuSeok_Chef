package com.example.BangGuSeok_Chef.dto.RecipeBoard;

import com.example.BangGuSeok_Chef.dto.MyInformation.MyPostsDto;
import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class RecipeBoardDto {
    private Long id;

    private String title;

    private String author;

    private String nickname;

    private String image;

    private LocalDateTime createDate;

    private LocalDateTime lastupdatedDate;

    private String category;

    private String level;

    private Integer click;

    private Integer recommend;

    private Integer comment;

    private String member;

    @Builder
    public RecipeBoardDto(String title, String author, String nickname, String category, String level, Integer click, Integer recommend) {
        this.title = title;
        this.author = author;
        this.nickname = nickname;
        this.category = category;
        this.level = level;
        this.click = click;
        this.recommend = recommend;
    }


    public static RecipeBoardDto createRecipeBoardDto(RecipeBoard recipeBoard, Member member){
        return new RecipeBoardDto(
                recipeBoard.getId(),
                recipeBoard.getTitle(),
                recipeBoard.getAuthor(),
                recipeBoard.getNickname(),
                recipeBoard.getImage(),
                recipeBoard.getCreateDate(),
                recipeBoard.getLastupdatedDate(),
                recipeBoard.getCategory(),
                recipeBoard.getLevel(),
                recipeBoard.getClick(),
                recipeBoard.getRecommend(),
                recipeBoard.getComment(),
                member.getProfile()
        );
    }

//    public static MyPostsDto createMyPostsDto(RecipeBoard recipeBoard){
//        return MyPostsDto(
//                MyPostsDto.get
//        )
//    }


/*    public Recipe_Board toEntity() {
        return new Recipe_Board(id, title, author, nickname, createDate, lastupdatedDate,category, level, click, recommend);
    }*/

}
