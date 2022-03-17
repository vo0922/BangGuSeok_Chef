package com.example.BangGuSeok_Chef.dto;

import com.example.BangGuSeok_Chef.entity.Cook_Step;
import com.example.BangGuSeok_Chef.entity.Ingredient;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import com.example.BangGuSeok_Chef.entity.Recipe_Contents;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@ToString
@Getter
public class RecipeDto {
    private Long recipe_id;

    public void setrecipe_id(Long recipe_id) {
        this.recipe_id = recipe_id;
    }

    private String title;

    private String author;

    private String nickname;

    private String category;

    private String level;

    private Integer click;

    private Integer recommend;

    private String introduce;

    private String video;

    private String tag;

    private String tip;

    private List<IngredientDto> ingredient;

    private List<Cook_Step> cook_steps;

    public Recipe_Board toRecipe() {
        return new Recipe_Board(title, author, nickname, category, level, click, recommend);
    }

    public Recipe_Contents toRecipe_Contents(Recipe_Board recipe_board, RecipeDto recipeDto){
        if(recipeDto.getRecipe_id() != recipe_board.getId())
            throw new IllegalArgumentException("레시피 상세정보 테이블 삽입 실패! 게시글 ID가 잘못되었습니다.");
        return new Recipe_Contents(recipe_board, introduce, video, tag, tip);
    }

    public List<Ingredient> toIngredient(RecipeDto recipeDto, Recipe_Board recipe_board) {
        Ingredient newingredient = new Ingredient();
        if(recipeDto.getRecipe_id() != recipe_board.getId())
            throw new IllegalArgumentException("재료 테이블 삽입 실패! 게시글 ID가 잘못되었습니다.");
        return newingredient.ingredients(recipe_board, ingredient);
    }

    public List<Cook_Step> toCookstep(Recipe_Board recipe_board, RecipeDto recipeDto){
        Cook_Step cook_step = new Cook_Step();
        if(recipeDto.getRecipe_id() != recipe_board.getId())
            throw new IllegalArgumentException("레시피 순서 테이블 삽입 실패! 게시글 ID가 잘못되었습니다.");
        return cook_step.cook_steps(recipe_board, cook_steps);
    }
}