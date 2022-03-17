package com.example.BangGuSeok_Chef.service;

import com.example.BangGuSeok_Chef.dto.IngredientDto;
import com.example.BangGuSeok_Chef.dto.RecipeDto;
import com.example.BangGuSeok_Chef.entity.Ingredient;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import com.example.BangGuSeok_Chef.repository.IngredientRepository;
import com.example.BangGuSeok_Chef.repository.Recipe_boardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    private final Recipe_boardRepository recipe_boardRepository;

    @Transactional
    public List<Ingredient> create(RecipeDto r_dto, Recipe_Board recipe_board) {
        recipe_boardRepository.findById(r_dto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("재료 테이블 삽입 실패! 대상 개시글이 없습니다.!"));

        List<Ingredient> ingredient = r_dto.toIngredient(r_dto, recipe_board);

        return ingredientRepository.saveAll(ingredient);
    }
}
