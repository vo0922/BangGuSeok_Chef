package com.example.BangGuSeok_Chef.entity;

import com.example.BangGuSeok_Chef.dto.IngredientDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private RecipeBoard recipe_board;

    private Integer ingredient_no;

    private String title;

    private String amount;


    public List<Ingredient> ingredients(RecipeBoard recipe_board, List<IngredientDto> ingredientlist) {
        List<Ingredient> result = new ArrayList();

        ingredientlist.forEach(str -> result.add(new Ingredient(recipe_board, str.getIngredient_no(), str.getTitle(), str.getAmount())));
        return result;
    }

    @Builder
    public Ingredient(RecipeBoard recipe_board, Integer ingredient_no, String title, String amount) {
        this.recipe_board = recipe_board;
        this.ingredient_no = ingredient_no;
        this.title = title;
        this.amount = amount;
    }
}
