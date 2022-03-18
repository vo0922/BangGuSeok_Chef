package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeBoardDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeDto;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.CookStep;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.Ingredient;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeContents;
import com.example.BangGuSeok_Chef.service.RecipeBoard.CookStepService;
import com.example.BangGuSeok_Chef.service.RecipeBoard.IngredientService;
import com.example.BangGuSeok_Chef.service.RecipeBoard.RecipeBoardService;
import com.example.BangGuSeok_Chef.service.RecipeBoard.RecipeContentsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RecipeController {

    private final RecipeBoardService recipeBoardService;
    private final RecipeContentsService recipeContentsService;
    private final IngredientService ingredientService;
    private final CookStepService cookStepService;


    @PostMapping("/api/board/create")
    public ResponseEntity<RecipeBoard> post(@RequestBody RecipeDto dto) {
        RecipeBoard recipe_board = recipeBoardService.create(dto);
        dto.setrecipe_id(recipe_board.getId());
        RecipeContents recipeContents = recipeContentsService.create(dto, recipe_board);
        List<Ingredient> ingredient = ingredientService.create(dto, recipe_board);
        List<CookStep> cookSteps = cookStepService.create(dto, recipe_board);
        return null;
    }

    // 전체
    @GetMapping("/api/recipeboard")
    public List<RecipeBoard> index(){
        return recipeBoardService.index();
    }

    // 검색
    @GetMapping("/api/recipeboard/{keyword}")
    public ResponseEntity<List<RecipeBoardDto>> search(@PathVariable String keyword){
        List<RecipeBoardDto> dtos = recipeBoardService.search(keyword);

        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

    // 카테고리별 검색
    @GetMapping("/api/recipeboard/category/{category}")
    public ResponseEntity<List<RecipeBoardDto>> categorySearch(@PathVariable String category){
        List<RecipeBoardDto> dtos = recipeBoardService.categorySearch(category);

        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

}
