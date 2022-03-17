package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.RecipeDto;
import com.example.BangGuSeok_Chef.entity.Cook_Step;
import com.example.BangGuSeok_Chef.entity.Ingredient;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import com.example.BangGuSeok_Chef.service.Cook_stepService;
import com.example.BangGuSeok_Chef.service.IngredientService;
import com.example.BangGuSeok_Chef.service.Recipe_boardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RecipeController {

    private final Recipe_boardService recipe_boardService;
    private final IngredientService ingredientService;
    private final Cook_stepService cook_stepService;

    @PostMapping("/api/board/create")
    public ResponseEntity<Recipe_Board> post(@RequestBody RecipeDto dto) {
        Recipe_Board recipe_board = recipe_boardService.create(dto);
        dto.setrecipe_id(recipe_board.getId());
        List<Ingredient> ingredient = ingredientService.create(dto, recipe_board);
        List<Cook_Step> cook_steps = cook_stepService.create(dto, recipe_board);
        return null;
    }
}
