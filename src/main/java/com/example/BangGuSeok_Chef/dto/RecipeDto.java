package com.example.BangGuSeok_Chef.dto;

import java.util.ArrayList;
import java.util.List;

public class RecipeDto {
    private Long recipe_id;

    public RecipeDto(Long recipe_id) {
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

    private List<Integer> ingredient_no;

    private List<String> name;

    private List<String> amount;

    private List<Integer> step_no;

    private List<String> contents;

    private List<String> image;
}
