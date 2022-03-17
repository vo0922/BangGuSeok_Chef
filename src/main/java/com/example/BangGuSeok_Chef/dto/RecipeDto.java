package com.example.BangGuSeok_Chef.dto;

import com.example.BangGuSeok_Chef.entity.Ingredient;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import lombok.AllArgsConstructor;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@ToString
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

    public Recipe_Board toRecipe() {
        return new Recipe_Board(title, author, nickname, category, level, click, recommend);
    }

    public List<Ingredient> toIngredient(Recipe_Board recipe_board) {
        Ingredient newingredient = new Ingredient();
        return newingredient.ingredients(recipe_board, ingredient);
    }
}
