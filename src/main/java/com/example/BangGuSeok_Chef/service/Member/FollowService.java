package com.example.BangGuSeok_Chef.service.Member;

import com.example.BangGuSeok_Chef.dto.Member.FollowDto;
import com.example.BangGuSeok_Chef.entity.Member.Follow;
import com.example.BangGuSeok_Chef.repository.Member.FollowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
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
}
