package com.example.BangGuSeok_Chef.entity.RecipeBoard;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

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
