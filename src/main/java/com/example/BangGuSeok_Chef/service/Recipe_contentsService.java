package com.example.BangGuSeok_Chef.service;

import com.example.BangGuSeok_Chef.dto.RecipeDto;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import com.example.BangGuSeok_Chef.entity.Recipe_Contents;
import com.example.BangGuSeok_Chef.repository.Recipe_boardRepository;
import com.example.BangGuSeok_Chef.repository.Recipe_contentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class Recipe_contentsService {

    private final Recipe_contentsRepository recipe_contentsRepository;
    private final Recipe_boardRepository recipe_boardRepository;

    @Transactional
    public Recipe_Contents create(RecipeDto recipeDto, Recipe_Board recipe_board) {
        recipe_boardRepository.findById(recipeDto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("레시피 상세 테이블 삽입 실패, 대상 게시글이 없습니다.!"));

        Recipe_Contents recipe_contents = recipeDto.toRecipe_Contents(recipe_board, recipeDto);

        return recipe_contentsRepository.save(recipe_contents);
    }

}