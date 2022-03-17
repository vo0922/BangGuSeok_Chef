package com.example.BangGuSeok_Chef.entity;

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
public class Recipe_Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String nickname;

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

    @Builder
    public Recipe_Board(String title, String author, String nickname, String category, String level, Integer click, Integer recommend) {
        this.title = title;
        this.author = author;
        this.nickname = nickname;
        this.createDate = createDate;
        this.lastupdatedDate = lastupdatedDate;
        this.category = category;
        this.level = level;
        this.click = click;
        this.recommend = recommend;
    }
}
