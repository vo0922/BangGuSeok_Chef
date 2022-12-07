package com.example.BangGuSeok_Chef.dto.FreeBoard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class FreeBoardCommentDto {
    private Long id;

    private String email;

    private String content;
}
