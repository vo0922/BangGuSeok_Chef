package com.example.BangGuSeok_Chef.dto.FreeBoard;

import com.example.BangGuSeok_Chef.entity.FreeBoard.FreeBoard;
import com.example.BangGuSeok_Chef.entity.Member.Member;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class FreeBoardDto {
    private Long id;

    private String title;

    private String author;

    private String nickname;

    private LocalDateTime createDate;

    private LocalDateTime lastUpdateDate;

    private String category;

    private Integer click;

    private Integer recommend;

    private Integer comment;

    @Builder
    public FreeBoardDto(String title, String author, String nickname, String category, Integer click, Integer recommend, Integer comment) {
        this.title = title;
        this.author = author;
        this.nickname = nickname;
        this.category = category;
        this.click = click;
        this.recommend = recommend;
        this.comment = comment;
    }

    public static FreeBoardDto createFreeBoardDto(FreeBoard freeBoard) {
        return new FreeBoardDto(
                freeBoard.getId(),
                freeBoard.getTitle(),
                freeBoard.getAuthor(),
                freeBoard.getNickname(),
                freeBoard.getCreateDate(),
                freeBoard.getLastUpdateDate(),
                freeBoard.getCategory(),
                freeBoard.getClick(),
                freeBoard.getRecommend(),
                freeBoard.getComment()
        );
    }

    public FreeBoard createFreeBoard() {
        return new FreeBoard(title, author, nickname, category, click, recommend, comment);
    }
}
