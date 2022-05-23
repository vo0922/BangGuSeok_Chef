package com.example.BangGuSeok_Chef.entity.RecipeBoard;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    public void setClick() {
        this.click = ++this.click;
    }

    private String category;

    public void setRecommend(Integer recommend) {
        this.recommend = recommend;
    }

    private String level;

    @Column(columnDefinition = "integer default 0")
    private Integer click;

    @Column(columnDefinition = "integer default 0")
    private Integer recommend;

    @Column(columnDefinition = "integer default 0")
    private Integer comment;

    public void setComment(Integer comment) {
        this.comment = comment;
    }

    @JsonManagedReference
    @OneToMany(mappedBy = "recipe_board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CookStep> cookSteps = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "recipeBoard", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Ingredient> ingredients = new ArrayList<>();

    @JsonManagedReference
    @OneToOne(mappedBy = "recipe_board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private RecipeContents recipeContents;

    @JsonManagedReference
    @OneToMany(mappedBy = "recipeBoard", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comments> comments = new ArrayList<>();

    public void addComment(Comments comment) {
        comments.add(comment);
    }

    public void recipejoin(List<CookStep> cookSteps, List<Ingredient> ingredients, RecipeContents recipeContents) {
        this.cookSteps = cookSteps;
        this.ingredients = ingredients;
        this.recipeContents = recipeContents;
    }

    //테스트 조인
    public void recipejoinModify( RecipeContents recipeContents, List<Ingredient> ingredients, List<CookStep> cookSteps) {
        this.recipeContents = recipeContents;
        this.ingredients = ingredients;
        this.cookSteps = cookSteps;
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

    @Builder
    public void patch(RecipeBoard recipeBoard){
        this.title = recipeBoard.title;
        this.image = recipeBoard.image;
        this.category = recipeBoard.category;
        this.level = recipeBoard.level;
    }
}
