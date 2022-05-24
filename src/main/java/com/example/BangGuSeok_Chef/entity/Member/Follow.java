package com.example.BangGuSeok_Chef.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String followingEmail;

    private String followedEmail;

    private Boolean followCheck;

    public void unFollow(){
        this.followCheck = false;
    }

    public void setFollow(){
        this.followCheck = true;
    }

}
