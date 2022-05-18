package com.example.BangGuSeok_Chef.entity.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.Member.Member;
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
public class ReCommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "recipe_id")
    private RecipeBoard recipeNo;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "member_id")
    private Member memberNo;

    private Boolean checked;

    private String author;

    public void setcheckup() {
        this.checked = true;
    }

    public void setcheckdown() {
        this.checked = false;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

}
