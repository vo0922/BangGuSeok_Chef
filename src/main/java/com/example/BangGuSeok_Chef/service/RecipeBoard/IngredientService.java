package com.example.BangGuSeok_Chef.service.RecipeBoard;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeDto;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.Ingredient;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.IngredientRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    private final RecipeBoardRepository recipeBoardRepository;

    @Transactional
    public List<Ingredient> create(RecipeDto r_dto, RecipeBoard recipe_board) {
        recipeBoardRepository.findById(r_dto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("재료 테이블 삽입 실패! 대상 개시글이 없습니다.!"));

        List<Ingredient> ingredient = r_dto.toIngredient(r_dto, recipe_board);

        return ingredientRepository.saveAll(ingredient);
    }

    public List<Ingredient> modify(RecipeDto dto, RecipeBoard recipe_board, Long id) {
        recipeBoardRepository.findById(dto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("재료 테이블 삽입 실패! 대상 개시글이 없습니다.!"));

        List<Ingredient> ingredient = dto.toIngredient(dto, recipe_board);
        ingredientRepository.deleteAll(ingredientRepository.findIngredientRecipe(id));
        return ingredientRepository.saveAll(ingredient);
    }
}
