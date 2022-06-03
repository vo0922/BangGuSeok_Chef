package com.example.BangGuSeok_Chef.dto.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class ChefRankDto {

    private Long Id;

    private String email;

    private String nickname;

    private String profile;
}
