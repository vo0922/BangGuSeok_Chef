package com.example.BangGuSeok_Chef.entity.RecipeBoard;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@Getter
@ToString
@Entity
public class RecipeBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String nickname;

    private String image;

    @CreatedDate
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime lastupdatedDate;

    private String category;

    private String level;

    @Column(columnDefinition = "integer default 0")
    private Integer click;

    @Column(columnDefinition = "integer default 0")
    private Integer recommend;

    @Column(columnDefinition = "integer default 0")
    private Integer comment;

    @OneToMany(mappedBy = "recipe_board")
    private List<CookStep> cookSteps = new ArrayList<>();

    @OneToMany(mappedBy = "recipeBoard")
    private List<Ingredient> ingredients = new ArrayList<>();

    @OneToOne
    private RecipeContents recipeContents;

    public void recipejoin(List<CookStep> cookSteps, List<Ingredient> ingredients, RecipeContents recipeContents) {
        this.cookSteps = cookSteps;
        this.ingredients = ingredients;
        this.recipeContents = recipeContents;
    }

    @Builder
    public RecipeBoard(String title, String author, String nickname, String image, String category, String level, Integer click, Integer recommend, Integer comment) {
        this.title = title;
        this.author = author;
        this.nickname = nickname;
        this.image = image;
        this.category = category;
        this.level = level;
        this.click = click;
        this.recommend = recommend;
        this.comment = comment;
    }
}
