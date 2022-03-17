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
        List<Ingredient> ingredient = r_dto.toIngredient(recipe_board);

        return ingredientRepository.saveAll(ingredient);
    }
}
