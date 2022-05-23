package com.example.BangGuSeok_Chef.entity.RecipeBoard;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @OneToOne(fetch = FetchType.LAZY)
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

    @Builder
    public void patch(RecipeContents recipeContents) {
        this.introduce = recipeContents.introduce;
        this.video = recipeContents.video;
        this.tag = recipeContents.tag;
        this.tip = recipeContents.tip;
    }
}
