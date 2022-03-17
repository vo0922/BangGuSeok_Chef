package com.example.BangGuSeok_Chef.service;

import com.example.BangGuSeok_Chef.dto.RecipeDto;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import com.example.BangGuSeok_Chef.repository.Recipe_boardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class Recipe_boardService {

    private final Recipe_boardRepository recipe_boardRepository;

    @Transactional
    public Recipe_Board create(RecipeDto dto) {
        Recipe_Board recipe_board = dto.toRecipe();
        if(recipe_board.getId() != null) {
            return null;
        }
        return recipe_boardRepository.save(recipe_board);
    }
}
