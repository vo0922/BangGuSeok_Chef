package com.example.BangGuSeok_Chef.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Recipe_Contents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe_Board recipe_board;

    private String introduce;

    private String video;

    private String tag;

    private String tip;

    @Builder
    public Recipe_Contents(Recipe_Board recipe_board, String introduce, String video, String tag, String tip) {
        this.recipe_board = recipe_board;
        this.introduce = introduce;
        this.video = video;
        this.tag = tag;
        this.tip = tip;
    }
}
