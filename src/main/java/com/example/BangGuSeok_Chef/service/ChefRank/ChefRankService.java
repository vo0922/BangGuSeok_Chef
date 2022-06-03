package com.example.BangGuSeok_Chef.service.ChefRank;

import com.example.BangGuSeok_Chef.dto.Member.ChefRankDto;
import com.example.BangGuSeok_Chef.repository.ChefRank.ChefRankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChefRankService {
    private final ChefRankRepository chefRankRepository;

    @Transactional
    public List<ChefRankDto> recommend(Pageable pageable) {
        return chefRankRepository.findRankRecommend(pageable)
                .stream()
                .map(
                        Member -> new ChefRankDto(Long.parseLong(Member[0].toString()), Member[1].toString(), Member[2].toString(), Member[3] != null ? Member[3].toString(): null)
                ).collect(Collectors.toList());
    }

    @Transactional
    public List<ChefRankDto> click(Pageable pageable) {
        return chefRankRepository.findRankClick(pageable)
                .stream()
                .map(
                        Member -> new ChefRankDto(Long.parseLong(Member[0].toString()), Member[1].toString(), Member[2].toString(), Member[3] != null ? Member[3].toString(): null)
                ).collect(Collectors.toList());
    }

    @Transactional
    public List<ChefRankDto> follow(Pageable pageable) {
        return chefRankRepository.findRankFollow(pageable)
                .stream()
                .map(
                        Member -> new ChefRankDto(Long.parseLong(Member[0].toString()), Member[1].toString(), Member[2].toString(), Member[3] != null ? Member[3].toString(): null)
                ).collect(Collectors.toList());
    }

    @Transactional
    public List<ChefRankDto> search(String keyword) {
        return chefRankRepository.findMember(keyword)
                .stream()
                .map(
                        Member -> new ChefRankDto(Long.parseLong(Member[0].toString()), Member[1].toString(), Member[2].toString(), Member[3] != null ? Member[3].toString(): null)
                ).collect(Collectors.toList());
    }
}
