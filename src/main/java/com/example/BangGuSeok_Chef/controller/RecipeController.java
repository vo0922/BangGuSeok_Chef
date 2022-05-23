package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.CookStepImageDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.ImageDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeBoardDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeDto;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.*;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import com.example.BangGuSeok_Chef.service.RecipeBoard.*;
import com.example.BangGuSeok_Chef.service.S3Uploader;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
    private final ReCommendService reCommendService;

    // 레시피 작성
    @PostMapping("/api/board/create")
    public RecipeBoard post(
            @RequestPart(value = "data") RecipeDto dto,
            @RequestPart(value = "boardimage")MultipartFile boardimage,
            @RequestPart(value = "cookstepimage") @Nullable List<MultipartFile> cookstepimage) throws IOException{

        dto.setImage(s3Uploader.upload(boardimage, "boardimage"));
        List<String> cookstepimages = s3Uploader.CookStepUpload(cookstepimage, "cookstepimage");
        RecipeBoard recipe_board = recipeBoardService.create(dto);
        dto.setrecipe_id(recipe_board.getId());
        RecipeContents recipeContents = recipeContentsService.create(dto, recipe_board);
        List<Ingredient> ingredient = ingredientService.create(dto, recipe_board);
        List<CookStep> cookSteps = cookStepService.create(dto, recipe_board, cookstepimages);

        return recipeBoardService.join(recipe_board, cookSteps, ingredient, recipeContents);
    }

    // 레시피 수정
    @PatchMapping("/api/board/modify/{id}")
    public RecipeBoard modify( @RequestPart(value = "data") RecipeDto dto,
                               @RequestPart(value = "boardimage") @Nullable MultipartFile boardimage,
                               @ModelAttribute CookStepImageDto cookstepimage,
                               @PathVariable Long id) throws IOException{

        List<ImageDto> image = cookstepimage.getImageDtos();
        List<String> cookstepimages = new ArrayList<>();

        for(ImageDto i : image){
            if(i.getFile() != null){
                cookstepimages.add(s3Uploader.upload(i.getFile(), "cookstepimage"));
            }else{
                if(i.getId()!=null)
                    cookstepimages.add(cookStepService.geturl(i.getId()));
                else
                    cookstepimages.add("https://recipeboard-image.s3.ap-northeast-2.amazonaws.com/cookstepimage/noimage.png");
            }
        }

        if(boardimage != null){
            dto.setImage(s3Uploader.upload(boardimage, "boardimage"));
        }else{
            dto.setImage(recipeBoardService.findImage(id));
        }

        RecipeBoard recipe_board = recipeBoardService.modify(dto, id);
        dto.setrecipe_id(recipe_board.getId());
        RecipeContents recipeContents = recipeContentsService.modify(dto, recipe_board, dto.getRecipe_id());
        List<Ingredient> ingredient = ingredientService.modify(dto, recipe_board, dto.getRecipe_id());
        List<CookStep> cookSteps = cookStepService.modify(dto, recipe_board, cookstepimages, dto.getRecipe_id());

        return recipeBoardService.joinModify(recipe_board, recipeContents, ingredient, cookSteps);
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
    public ResponseEntity<RecipeBoard> categorySearch(@PathVariable Long id){
        RecipeBoard result = recipeBoardRepository.findById(id).orElse(null);
        recipeBoardService.click(result);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    // 게시글 삭제
    @DeleteMapping("api/recipeboard/view/delete/{id}")
    public String deleteboard(@PathVariable Long id) {
        recipeBoardService.delete(id);

        return "삭제완료";
    }

    // 좋아요 체크
    @GetMapping("api/recipeboard/view/like/check")
    public Boolean recommendCheck(@RequestParam(value = "recipe_id") Long recipe_id, @RequestParam(value = "email") String email) {
        return reCommendService.likeCheck(recipe_id, email);
    }

    // 좋아요 클릭
    @GetMapping("api/recipeboard/view/like")
    public Boolean recommendClick(@RequestParam(value = "recipe_id") Long recipe_id, @RequestParam(value = "email") String email) {
        Boolean bool = reCommendService.likeClick(recipe_id, email);
        return bool;
    }

}
