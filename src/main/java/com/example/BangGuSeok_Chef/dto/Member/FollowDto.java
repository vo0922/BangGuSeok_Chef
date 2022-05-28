package com.example.BangGuSeok_Chef.dto.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class FollowDto {
    private Long Id;

    private Boolean followCheck;

    private String followedEmail;

    private String followingEmail;


}
