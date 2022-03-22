package com.example.BangGuSeok_Chef.entity.RecipeBoard;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CookStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "recipe_id")
    private RecipeBoard recipe_board;

    private Integer step_no;

    private String contents;

    private String image;

    public List<CookStep> cookSteps(RecipeBoard recipeBoard, List<CookStep> cook_steps){
        List<CookStep> result = new ArrayList();

        cook_steps.forEach(str -> result.add(new CookStep(recipeBoard, str.getStep_no(), str.getContents(), str.getImage())));
        return result;
    }

    @Builder
    public CookStep(RecipeBoard recipeBoard, Integer step_no, String contents, String image) {
        this.recipe_board = recipeBoard;
        this.step_no = step_no;
        this.contents = contents;
        this.image = image;
    }
}
