package com.example.BangGuSeok_Chef.entity.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
