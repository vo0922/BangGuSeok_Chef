package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.CommentsDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.ReCommentsDto;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.Comments;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.ReComments;
import com.example.BangGuSeok_Chef.service.RecipeBoard.CommentsService;
import com.example.BangGuSeok_Chef.service.RecipeBoard.ReCommentsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CommentController {

    private final CommentsService commentsService;
    private final ReCommentsService reCommentsService;

    // 댓글작성
    @PostMapping("/api/recipeboard/comments")
    public Comments addcomments(@RequestBody CommentsDto commentsDto) {

        return commentsService.addComment(commentsDto);
    }

    // 댓글삭제
    @DeleteMapping("/api/recipeboard/comments/delete/{id}")
    public String deletecomments(@PathVariable Long id) {
        commentsService.delete(id);

        return "삭제성공";
    }

    // 댓글수정
    @PutMapping("/api/recipeboard/comments/update")
    public String updatecomments(@RequestBody CommentsDto dto) {
        commentsService.update(dto);

        return "수정성공";
    }

    // 대댓글 작성
    @PostMapping("/api/recipeboard/recomments")
    public ReComments addrecomments(@RequestBody ReCommentsDto reCommentsDto) {

        return reCommentsService.addreComment(reCommentsDto);
    }

    // 대댓글삭제
    @DeleteMapping("/api/recipeboard/recomments/delete/{id}")
    public String deleterecomments(@PathVariable Long id) {
        reCommentsService.delete(id);

        return "삭제성공";
    }

    // 대댓글수정
    @PutMapping("/api/recipeboard/recomments/update")
    public String updaterecomments(@RequestBody ReCommentsDto dto) {
        reCommentsService.update(dto);

        return "수정성공";
    }
}
