package com.example.BangGuSeok_Chef.service.MyInformation;

import com.example.BangGuSeok_Chef.dto.MyInformation.MyPostsDto;
import com.example.BangGuSeok_Chef.dto.MyInformation.MyinformationDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeBoardDto;
import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.example.BangGuSeok_Chef.repository.Member.FollowRepository;
import com.example.BangGuSeok_Chef.repository.Member.MemberRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.CommentsRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.ReCommentsRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecommendRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyInformationService {
    private final MemberRepository memberRepository;
    private final RecipeBoardRepository recipeBoardRepository;
    private final CommentsRepository commentsRepository;
    private final RecommendRepository recommendRepository;
    private final FollowRepository followRepository;

    public MyinformationDto information(String email){
        Member member = memberRepository.findByEmail(email).orElse(null);
        Integer click = recipeBoardRepository.findClickByAuthor(email);
        Integer postCount = recipeBoardRepository.countByAuthor(email);
        Integer recommendCount = recommendRepository.countCheckedByAuthor(email);
        Integer followerCount = followRepository.countByFollower(email);
        Integer followingCount = followRepository.countByFollowing(email);

        MyinformationDto dto = new MyinformationDto(email, member.getNickname(), member.getGender(), member.getProfile(),  member.getAge(), postCount, click, recommendCount, followerCount, followingCount);

        return dto;
    }

    public List<MyPostsDto> posts(String email) {
        return recipeBoardRepository.findByAuthor(email)
                .stream()
                .map(recipeBoard -> MyPostsDto.createMyPostDto(recipeBoard))
                .collect(Collectors.toList());
    }
}
