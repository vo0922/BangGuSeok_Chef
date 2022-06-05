package com.example.BangGuSeok_Chef.dto.MyInformation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MyinformationDto {
    private String email;

    private String nickname;

    private String gender;

    private String profile;

    private Integer age;

    private String introduce;

    private Integer postCount;

    private Integer postView;

    private Integer recommendCount;

    private Integer followerCount;

    private Integer followingCount;

}
