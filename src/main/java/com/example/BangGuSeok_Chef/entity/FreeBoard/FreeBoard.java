package com.example.BangGuSeok_Chef.entity.FreeBoard;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
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
public class FreeBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String nickname;

    @CreatedDate
    private LocalDateTime createDate;

    @LastModifiedDate
    private LocalDateTime lastUpdateDate;

    private String category;

    @Column(columnDefinition = "integer default 0")
    private Integer click;

    @Column(columnDefinition = "integer default 0")
    private Integer recommend;

    @Column(columnDefinition = "integer default 0")
    private Integer comment;

    @JsonManagedReference
    @OneToMany(mappedBy = "freeBoard", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FreeBoardComment> commentList = new ArrayList<>();

    public void setFreeBoardComment(Integer comment) { this.comment = comment;}

    public void setFreeBoardReComment(Integer recommend) { this.recommend = recommend;}

    public void addFreeBoardComment(FreeBoardComment comment) {commentList.add(comment);}

    @Builder
    public FreeBoard(String title, String author, String nickname, String category, Integer click, Integer recommend, Integer comment) {
        this.title = title;
        this.author = author;
        this.nickname = nickname;
        this.category = category;
        this.click = click;
        this.recommend = recommend;
        this.comment = comment;
    }
}