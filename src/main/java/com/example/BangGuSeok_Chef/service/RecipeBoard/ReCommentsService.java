package com.example.BangGuSeok_Chef.service.RecipeBoard;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.CommentsDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.ReCommentsDto;
import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.Comments;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.ReComments;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.repository.Member.MemberRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.CommentsRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.ReCommentsRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ReCommentsService {
    private final MemberRepository memberRepository;
    private final CommentsRepository commentsRepository;
    private final ReCommentsRepository reCommentsRepository;

    @Transactional
    public ReComments addreComment(ReCommentsDto reCommentsDto) {
        Member member = memberRepository.findByEmail(reCommentsDto.getEmail()).orElse(null);
        Comments comments = commentsRepository.findById(reCommentsDto.getId()).orElse(null);
        ReComments reComments = new ReComments(null, member, reCommentsDto.getContent(), comments);
        ReComments reComment = reCommentsRepository.save(reComments);
        comments.addReComment(reComment);
        commentsRepository.save(comments);
        return reComment;
    }

    @Transactional
    public void delete(Long id) {
        ReComments reComments = reCommentsRepository.findById(id).orElse(null);
        reCommentsRepository.delete(reComments);
    }

    @Transactional
    public ReComments update(ReCommentsDto dto) {
        ReComments reComments = reCommentsRepository.findById(dto.getId()).orElse(null);
        reComments.setContent(dto.getContent());
        return reCommentsRepository.save(reComments);
    }
}
