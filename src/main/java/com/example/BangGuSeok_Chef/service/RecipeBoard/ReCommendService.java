package com.example.BangGuSeok_Chef.service.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.ReCommend;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.repository.Member.MemberRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecommendRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ReCommendService {

    private final RecommendRepository likeRepository;
    private final MemberRepository memberRepository;
    private final RecipeBoardRepository recipeBoardRepository;

    @Transactional
    public Boolean likeCheck(Long recipe_id, String email) {
        RecipeBoard recipeBoard = recipeBoardRepository.findById(recipe_id).orElse(null);
        Member member = memberRepository.findByEmail(email).orElse(null);
        if(likeRepository.existsLike(recipeBoard, member)==0) {
            return false;
        }
        return true;
    }

    @Transactional
    public Boolean likeClike(Long recipe_id, String email) {
        Boolean b = false;
        RecipeBoard recipeBoard = recipeBoardRepository.findById(recipe_id).orElse(null);
        Member member = memberRepository.findByEmail(email).orElse(null);
        System.out.println("체크체크" + likeRepository.existsLike(recipeBoard, member));
        if(likeRepository.existsLike(recipeBoard, member)!=0){
            ReCommend like = likeRepository.findByRecipeNoAndMemberNo(recipeBoard, member);
            if(like.getChecked()) {
                like.setcheckdown();
                b = false;
            }
            else {
                like.setcheckup();
                b = true;
            }
            likeRepository.save(like);
            Integer count = likeRepository.countByRecipeNo(recipeBoard);
            recipeBoard.setRecommend(count);
        }else{
            ReCommend like = new ReCommend(null, recipeBoard, member, true);
            likeRepository.save(like);
            b = true;
            Integer count = likeRepository.countByRecipeNo(recipeBoard);
            recipeBoard.setRecommend(count);
        }
        return b;
    }
}
