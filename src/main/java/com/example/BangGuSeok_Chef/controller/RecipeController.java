package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.CommentsDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeBoardDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeDto;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.*;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.CookStepRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import com.example.BangGuSeok_Chef.service.RecipeBoard.*;
import com.example.BangGuSeok_Chef.service.S3Uploader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RecipeController {
    private final RecipeBoardService recipeBoardService;
    private final RecipeBoardRepository recipeBoardRepository;
    private final RecipeContentsService recipeContentsService;
    private final IngredientService ingredientService;
    private final CookStepService cookStepService;
    private final S3Uploader s3Uploader;

    // 레시피 작성
    @PostMapping("/api/board/create")
    public RecipeBoard post(@RequestPart(value = "data") RecipeDto dto, @RequestPart(value = "boardimage")MultipartFile boardimage, @RequestPart(value = "cookstepimage")List<MultipartFile> cookstepimage) throws IOException{
        dto.setImage(s3Uploader.upload(boardimage, "boardimage"));
        RecipeBoard recipe_board = recipeBoardService.create(dto);
        dto.setrecipe_id(recipe_board.getId());
        RecipeContents recipeContents = recipeContentsService.create(dto, recipe_board);
        List<Ingredient> ingredient = ingredientService.create(dto, recipe_board);
        List<CookStep> cookSteps = cookStepService.create(dto, recipe_board);
        //List<String> cookstepimages = Collections.singletonList(s3Uploader.upload(cookstepimage, "cookstepimage"));
        return recipeBoardService.join(recipe_board, cookSteps, ingredient, recipeContents);
    }

    // 전체
    @GetMapping("/api/recipeboard")
    public List<RecipeBoardDto> index(Pageable pageable){
        List<RecipeBoardDto> page = recipeBoardService.index(pageable);
        return page;
    }

    // 검색
    @GetMapping("/api/recipeboard/{keyword}")
    public List<RecipeBoardDto> search(@PathVariable String keyword, Pageable pageable){
        List<RecipeBoardDto> page = recipeBoardService.search(keyword, pageable);

        return page;
    }

    // 카테고리별 검색
    @GetMapping("/api/recipeboard/category/{category}")
    public ResponseEntity<List<RecipeBoardDto>> categorySearch(@PathVariable String category, Pageable pageable){
        List<RecipeBoardDto> dtos = recipeBoardService.categorySearch(category, pageable);

        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

    // 상세페이지 뷰
    @GetMapping("/api/recipeboard/view/{id}")
    public ResponseEntity<Optional<RecipeBoard>> categorySearch(@PathVariable Long id){
        Optional<RecipeBoard> result = recipeBoardRepository.findById(id);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 게시글 삭제
    @DeleteMapping("api/recipeboard/view/delete/{id}")
    public String deleteboard(@PathVariable Long id) {
        recipeBoardService.delete(id);

        return "삭제완료";
    }

    @PostMapping("/images")
    public String upload(@RequestParam("images")MultipartFile multipartFile) throws IOException{
        s3Uploader.upload(multipartFile, "static");
        return "test";
    }

}
