package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.RecipeDto;
import com.example.BangGuSeok_Chef.entity.CookStep;
import com.example.BangGuSeok_Chef.entity.Ingredient;
import com.example.BangGuSeok_Chef.entity.RecipeBoard;
import com.example.BangGuSeok_Chef.entity.RecipeContents;
import com.example.BangGuSeok_Chef.service.Cook_stepService;
import com.example.BangGuSeok_Chef.service.IngredientService;
import com.example.BangGuSeok_Chef.service.Recipe_boardService;
import com.example.BangGuSeok_Chef.service.Recipe_contentsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final Recipe_contentsService recipe_contentsService;
    private final IngredientService ingredientService;
    private final Cook_stepService cook_stepService;


    @PostMapping("/api/board/create")
    public ResponseEntity<RecipeBoard> post(@RequestBody RecipeDto dto) {
        RecipeBoard recipe_board = recipe_boardService.create(dto);
        dto.setrecipe_id(recipe_board.getId());
        RecipeContents recipe_contents = recipe_contentsService.create(dto, recipe_board);
        List<Ingredient> ingredient = ingredientService.create(dto, recipe_board);
        List<CookStep> cook_steps = cook_stepService.create(dto, recipe_board);
        return null;
    }
}
