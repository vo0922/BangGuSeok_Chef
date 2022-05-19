package com.example.BangGuSeok_Chef.entity.RecipeBoard;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.IngredientDto;
import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    @JoinColumn(name = "recipe_id")
    private RecipeBoard recipeBoard;

    private Integer ingredient_no;

    private String title;

    private String amount;


    public List<Ingredient> ingredients(RecipeBoard recipeBoard, List<IngredientDto> ingredientlist) {
        List<Ingredient> result = new ArrayList();

        ingredientlist.forEach(str -> result.add(new Ingredient(recipeBoard, str.getIngredient_no(), str.getTitle(), str.getAmount())));
        return result;
    }

    @Builder
    public Ingredient(RecipeBoard recipeBoard, Integer ingredient_no, String title, String amount) {
        this.recipeBoard = recipeBoard;
        this.ingredient_no = ingredient_no;
        this.title = title;
        this.amount = amount;
    }

}
