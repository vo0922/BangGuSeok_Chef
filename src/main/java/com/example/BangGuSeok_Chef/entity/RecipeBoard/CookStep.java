package com.example.BangGuSeok_Chef.entity.RecipeBoard;


import com.example.BangGuSeok_Chef.dto.RecipeBoard.CookStepDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    @JoinColumn(name = "recipe_id")
    private RecipeBoard recipe_board;

    private Integer step_no;

    private String contents;

    private String image;

    public void setImage(String image) {
        this.image = image;
    }

    public List<CookStep> cookSteps(RecipeBoard recipeBoard, Map<CookStepDto, String> map){
        List<CookStep> result = new ArrayList<>();
        map.forEach((key,value)->
            result.add(new CookStep(recipeBoard, key.getStep_no(), key.getContents(), value))
        );

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
