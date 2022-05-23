package com.example.BangGuSeok_Chef.service.MyInformation;

import com.example.BangGuSeok_Chef.dto.MyInformation.MyinformationDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeBoardDto;
import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.example.BangGuSeok_Chef.repository.Member.MemberRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.CommentsRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.ReCommentsRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecommendRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyInformationService {
    private final MemberRepository memberRepository;
    private final RecipeBoardRepository recipeBoardRepository;
    private final CommentsRepository commentsRepository;
    private final RecommendRepository recommendRepository;

    public MyinformationDto information(String email){
        Member member = memberRepository.findByEmail(email).orElse(null);
        Integer click = recipeBoardRepository.findClickByAuthor(email);
        Integer postCount = recipeBoardRepository.countByAuthor(email);
        Integer recommendCount = recommendRepository.countCheckedByAuthor(email);

        MyinformationDto dto = new MyinformationDto(email, member.getProfile(), member.getNickname(), member.getGender(), member.getAge(), postCount, click, recommendCount);

        dto.setEmail(email);
        dto.setProfile(member.getProfile());
        dto.setNickname(member.getNickname());
        dto.setGender(member.getGender());
        dto.setAge(member.getAge());
        dto.setPostCount(postCount);
        dto.setPostView(click);
        dto.setRecommendCount(recommendCount);

        return dto;
    }

    public RecipeBoardDto posts(String email) {
        return null;
    }
}
