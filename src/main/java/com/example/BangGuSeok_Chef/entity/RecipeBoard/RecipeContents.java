package com.example.BangGuSeok_Chef.entity.RecipeBoard;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RecipeContents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "recipe_id")
    private RecipeBoard recipe_board;

    private String introduce;

    private String video;

    private String tag;

    private String tip;

    @Builder
    public RecipeContents(RecipeBoard recipeBoard, String introduce, String video, String tag, String tip) {
        this.recipe_board = recipeBoard;
        this.introduce = introduce;
        this.video = video;
        this.tag = tag;
        this.tip = tip;
    }
}
