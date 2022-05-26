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

    @Column(name="following_email")
    private String followingEmail;

    @Column(name="followed_email")
    private String followedEmail;

    @Column(name="follow_check")
    private Boolean followCheck;

    public void unFollow(){
        this.followCheck = false;
    }

    public void setFollow(){
        this.followCheck = true;
    }

}




