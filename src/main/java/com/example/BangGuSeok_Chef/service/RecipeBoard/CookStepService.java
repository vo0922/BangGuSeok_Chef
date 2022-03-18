package com.example.BangGuSeok_Chef.service.RecipeBoard;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeDto;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.CookStep;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.CookStepRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CookStepService {

    private final CookStepRepository cook_stepRepository;
    private final RecipeBoardRepository recipeBoardRepository;

    public List<CookStep> create(RecipeDto recipeDto, RecipeBoard recipe_board){
        recipeBoardRepository.findById(recipeDto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("레시피 순서 테이블 삽입 실패! 대상 게시글이 없습니다.!"));

        List<CookStep> cookSteps = recipeDto.toCookstep(recipe_board, recipeDto);

        return cook_stepRepository.saveAll(cookSteps);
    }
}
