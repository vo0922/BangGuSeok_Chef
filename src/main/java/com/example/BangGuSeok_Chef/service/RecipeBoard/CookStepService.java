package com.example.BangGuSeok_Chef.service.RecipeBoard;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeDto;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.CookStep;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.CookStepRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CookStepService {

    private final CookStepRepository cook_stepRepository;
    private final RecipeBoardRepository recipeBoardRepository;

    @Transactional
    public List<CookStep> create(RecipeDto recipeDto, RecipeBoard recipe_board, List<String> image){
        recipeBoardRepository.findById(recipeDto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("레시피 순서 테이블 삽입 실패! 대상 게시글이 없습니다.!"));

        List<CookStep> cookSteps = recipeDto.toCookstep(recipe_board, recipeDto, image);

        return cook_stepRepository.saveAll(cookSteps);
    }

    @Transactional
    public String geturl(Long id) {
        CookStep cookStep = cook_stepRepository.findById(id).orElse(null);
        return cookStep.getImage();
    }

    @Transactional
    public List<CookStep> modify(RecipeDto dto, RecipeBoard recipe_board, List<String> cookstepimages, Long id) {
        recipeBoardRepository.findById(dto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("레시피 순서 테이블 삽입 실패! 대상 게시글이 없습니다.!"));

        List<CookStep> cookSteps = dto.toCookstep(recipe_board, dto, cookstepimages);
        cook_stepRepository.deleteAll(cook_stepRepository.findCookStepRecipe(id));
        return cook_stepRepository.saveAll(cookSteps);

    }
}
