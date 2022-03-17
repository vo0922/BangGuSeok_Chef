package com.example.BangGuSeok_Chef.dto.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.CookStep;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.Ingredient;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeContents;
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

    private List<CookStep> cook_steps;

    public RecipeBoard toRecipe() {
        return new RecipeBoard(title, author, nickname, category, level, click, recommend);
    }

    public RecipeContents toRecipe_Contents(RecipeBoard recipe_board, RecipeDto recipeDto){
        if(recipeDto.getRecipe_id() != recipe_board.getId())
            throw new IllegalArgumentException("레시피 상세정보 테이블 삽입 실패! 게시글 ID가 잘못되었습니다.");
        return new RecipeContents(recipe_board, introduce, video, tag, tip);
    }

    public List<Ingredient> toIngredient(RecipeDto recipeDto, RecipeBoard recipe_board) {
        Ingredient newingredient = new Ingredient();
        if(recipeDto.getRecipe_id() != recipe_board.getId())
            throw new IllegalArgumentException("재료 테이블 삽입 실패! 게시글 ID가 잘못되었습니다.");
        return newingredient.ingredients(recipe_board, ingredient);
    }

    public List<CookStep> toCookstep(RecipeBoard recipe_board, RecipeDto recipeDto){
        CookStep cook_step = new CookStep();
        if(recipeDto.getRecipe_id() != recipe_board.getId())
            throw new IllegalArgumentException("레시피 순서 테이블 삽입 실패! 게시글 ID가 잘못되었습니다.");
        return cook_step.cookSteps(recipe_board, cook_steps);
    }
}