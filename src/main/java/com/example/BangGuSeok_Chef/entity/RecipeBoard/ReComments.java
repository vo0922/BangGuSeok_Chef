package com.example.BangGuSeok_Chef.entity.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReComments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void setContent(String content) {
        this.content = content;
    }

    private String content;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    @JoinColumn(name = "comments_id")
    private Comments comments;
}
