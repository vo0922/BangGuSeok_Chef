package com.example.BangGuSeok_Chef.repository.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.Member.Member;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.ReCommend;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecommendRepository extends JpaRepository<ReCommend, Long> {

    @Query(value="select exists (select *from re_commend where recipe_id = :recipeBoard and member_id = :member)", nativeQuery = true)
    Integer existsRecommend(RecipeBoard recipeBoard, Member member);

    ReCommend findByRecipeNoAndMemberNo(RecipeBoard recipeBoard, Member member);

    Integer countByRecipeNoAndChecked(RecipeBoard recipeBoard, Boolean bool);
}
