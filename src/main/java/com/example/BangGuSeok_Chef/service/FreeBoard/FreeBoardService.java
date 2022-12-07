package com.example.BangGuSeok_Chef.service.FreeBoard;

import com.example.BangGuSeok_Chef.dto.FreeBoard.FreeBoardDto;
import com.example.BangGuSeok_Chef.entity.FreeBoard.FreeBoard;
import com.example.BangGuSeok_Chef.repository.FreeBoard.FreeBoardRepository;
import com.example.BangGuSeok_Chef.repository.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class FreeBoardService {

    private final FreeBoardRepository freeBoardRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public FreeBoard create(FreeBoardDto freeBoardDto) {
        FreeBoard freeBoard = freeBoardDto.createFreeBoard();

        return freeBoardRepository.save(freeBoard);
    }

    @Transactional
    public List<FreeBoardDto> FreeBoardFindAll(Pageable pageable) {

        return freeBoardRepository.findAll(pageable)
                .stream()
                .map(
                        freeBoard -> FreeBoardDto.createFreeBoardDto(freeBoard)
                )
                .collect(Collectors.toList());
    }
}
