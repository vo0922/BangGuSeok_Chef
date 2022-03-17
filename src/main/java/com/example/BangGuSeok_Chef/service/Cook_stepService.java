package com.example.BangGuSeok_Chef.service;

import com.example.BangGuSeok_Chef.dto.RecipeDto;
import com.example.BangGuSeok_Chef.entity.Cook_Step;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import com.example.BangGuSeok_Chef.repository.Cook_stepRepository;
import com.example.BangGuSeok_Chef.repository.Recipe_boardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class Cook_stepService {

    private final Cook_stepRepository cook_stepRepository;
    private final Recipe_boardRepository recipe_boardRepository;

    public List<Cook_Step> create(RecipeDto recipeDto, Recipe_Board recipe_board){
        recipe_boardRepository.findById(recipeDto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("레시피 순서 테이블 삽입 실패! 대상 게시글이 없습니다.!"));

        List<Cook_Step> cook_steps = recipeDto.toCookstep(recipe_board, recipeDto);

        return cook_stepRepository.saveAll(cook_steps);
    }
}
