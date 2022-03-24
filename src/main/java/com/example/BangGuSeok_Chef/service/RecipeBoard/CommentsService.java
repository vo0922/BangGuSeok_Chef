package com.example.BangGuSeok_Chef.service.RecipeBoard;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.CommentsDto;
import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.Comments;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.repository.Member.MemberRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.CommentsRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class CommentsService {
    private final MemberRepository memberRepository;
    private final CommentsRepository commentsRepository;
    private final RecipeBoardRepository recipeBoardRepository;

    @Transactional
    public Comments addComment(CommentsDto commentsDto) {
        Member member = memberRepository.findByEmail(commentsDto.getEmail()).orElse(null);
        RecipeBoard recipeBoard = recipeBoardRepository.findById(commentsDto.getId()).orElse(null);
        Comments comments = new Comments(null, member, commentsDto.getContent(), recipeBoard, null);
        Comments comment = commentsRepository.save(comments);
        recipeBoard.addComment(comment);
        recipeBoard.setComment(commentsRepository.countRecipeId(commentsDto.getId()));
        recipeBoardRepository.save(recipeBoard);
        return comment;
    }

    @Transactional
    public Comments delete(Long id) {
        Comments comments = commentsRepository.findById(id).orElse(null);
        RecipeBoard recipeBoard = comments.getRecipeBoard();
        commentsRepository.delete(comments);
        recipeBoard.setComment(commentsRepository.countRecipeId(recipeBoard.getId()));
        recipeBoardRepository.save(recipeBoard);
        return null;
    }

    @Transactional
    public Comments update(CommentsDto dto) {
        Comments comments = commentsRepository.findById(dto.getId()).orElse(null);
        comments.setContent(dto.getContent());
        return commentsRepository.save(comments);
    }
}
