package com.example.BangGuSeok_Chef.service.Member;

import com.example.BangGuSeok_Chef.dto.Member.FollowDto;
import com.example.BangGuSeok_Chef.dto.Member.FollowRecipeDto;
import com.example.BangGuSeok_Chef.entity.Member.Follow;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.ReCommend;
import com.example.BangGuSeok_Chef.repository.Member.FollowRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecommendRepository;
import com.example.BangGuSeok_Chef.service.RecipeBoard.ReCommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowService {

    private final FollowRepository followRepository;
    private final ReCommendService reCommendService;

    @Transactional
    public Follow follow(FollowDto followDto){
        if(followRepository.existFollow(followDto.getFollowedEmail(), followDto.getFollowingEmail()) == 0){
            newFollow(followDto);
            return null;
        }
        else{
            Follow follow = followRepository.findByUsers(followDto.getFollowedEmail(), followDto.getFollowingEmail());
            if(follow.getFollowCheck()){
                follow.unFollow();
            }
            else{
                follow.setFollow();
            }
            return followRepository.save(follow);
        }
    }

    @Transactional
    public Follow newFollow(FollowDto followDto){
        Follow follow = new Follow(null ,followDto.getFollowingEmail(), followDto.getFollowedEmail(), true);
        return followRepository.save(follow);
    }

    @Transactional
    public Boolean followCheck(FollowDto followDto){
        return followRepository.findFollowByUser(followDto.getFollowedEmail(), followDto.getFollowingEmail());
    }

    // 홈 게시글
    @Transactional
    public List<FollowRecipeDto> view(Pageable pageable, String email) {
        List<Follow> findFollow = followRepository.findByFollowingEmailAndFollowCheck(email, true);
        List<String> emails = new ArrayList<>();
        for(Follow f : findFollow) {
            emails.add(f.getFollowedEmail());
        }

        List<Object[]> followRecipes = followRepository.findFollowRecipe(emails, pageable);
        List<FollowRecipeDto> followRecipeDtos = new ArrayList<>();
        followRecipes
                .stream()
                .map(
                        o -> {
                            Boolean reCommend = reCommendService.likeCheck(Long.parseLong(o[0].toString()), email);
                            String str = o[3].toString();
                            String[] oldDay = str.split("[.]");
                            LocalDateTime dateTime = LocalDateTime.parse(
                                    oldDay[0],
                                    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
                            );
                            String day = "";
                            if(Duration.between(dateTime, LocalDateTime.now()).toDays() != 0){
                                day = Duration.between(dateTime, LocalDateTime.now()).toDays() + "일 전";
                            }else{
                                day = Duration.between(dateTime, LocalDateTime.now()).toHours() + "시간 전";
                            }
                            return followRecipeDtos.add(new FollowRecipeDto(o[0],o[1],o[2],day,o[4],o[5],o[6],o[7],o[8],(o[9] != null) ? o[9] : "",reCommend));
                        }
                ).collect(Collectors.toList());
        return followRecipeDtos;
    }
}
