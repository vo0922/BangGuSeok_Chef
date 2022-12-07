package com.example.BangGuSeok_Chef.service.FreeBoard;

import com.example.BangGuSeok_Chef.dto.FreeBoard.FreeBoardCommentDto;
import com.example.BangGuSeok_Chef.entity.FreeBoard.FreeBoard;
import com.example.BangGuSeok_Chef.entity.FreeBoard.FreeBoardComment;
import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.example.BangGuSeok_Chef.repository.FreeBoard.FreeBoardCommentRepository;
import com.example.BangGuSeok_Chef.repository.FreeBoard.FreeBoardRepository;
import com.example.BangGuSeok_Chef.repository.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class FreeBoardCommentService {

    private final MemberRepository memberRepository;

    private final FreeBoardCommentRepository freeBoardCommentRepository;

    private final FreeBoardRepository freeBoardRepository;

    @Transactional
    public FreeBoardComment create(FreeBoardCommentDto freeBoardCommentDto) {
        Member member = memberRepository.findByEmail(freeBoardCommentDto.getEmail()).orElse(null);

        FreeBoard freeBoard = freeBoardRepository.findById(freeBoardCommentDto.getId()).orElse(null);

        FreeBoardComment freeBoardComment = new FreeBoardComment(member, freeBoardCommentDto.getContent(), freeBoard);

        FreeBoardComment comment = freeBoardCommentRepository.save(freeBoardComment);

        freeBoard.addFreeBoardComment(comment);
        /*freeBoard.setFreeBoardComment(freeBoard.getCommentList().size());*/
        freeBoardRepository.save(freeBoard);
        return freeBoardComment;
    }
}
