package com.example.BangGuSeok_Chef.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Cook_Step {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe_Board recipe_board;

    private Integer step_no;

    private String contents;

    private String image;

    public List<Cook_Step> cook_steps(Recipe_Board recipe_board, List<Cook_Step> cook_steps){
        List<Cook_Step> result = new ArrayList();

        cook_steps.forEach(str -> result.add(new Cook_Step(recipe_board, str.getStep_no(), str.getContents(), str.getImage())));
        return result;
    }

    @Builder
    public Cook_Step(Recipe_Board recipe_board, Integer step_no, String contents, String image) {
        this.recipe_board = recipe_board;
        this.step_no = step_no;
        this.contents = contents;
        this.image = image;
    }
}
