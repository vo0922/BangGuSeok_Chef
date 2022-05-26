package com.example.BangGuSeok_Chef.service.Member;

import com.example.BangGuSeok_Chef.dto.Member.FollowDto;
import com.example.BangGuSeok_Chef.dto.Member.FollowResponseDto;
import com.example.BangGuSeok_Chef.entity.Member.Follow;
import com.example.BangGuSeok_Chef.repository.Member.FollowRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowService {

    private final FollowRepository followRepository;

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

    public Boolean followCheck(FollowDto followDto){
        return followRepository.findFollowByUser(followDto.getFollowedEmail(), followDto.getFollowingEmail());
    }

    public List<FollowResponseDto> getFollowing(FollowDto followDto){
        return followRepository.findByFollowingEmail(followDto.getFollowingEmail())
                .stream()
                .map(
                         obj -> {
                            return new FollowResponseDto(obj[0].toString(), obj[1] == null ? "null" : obj[1].toString(), obj[2].toString());
                         }
                ).collect(Collectors.toList());
    }

    public List<FollowResponseDto> getFollower(FollowDto followDto){
        return followRepository.findByFollowerEmail(followDto.getFollowedEmail())
                .stream()
                .map(
                        obj -> {
                            return new FollowResponseDto(obj[0].toString(), obj[1] == null ? "null" : obj[1].toString(), obj[2].toString());
                        }
                ).collect(Collectors.toList());
    }

}
