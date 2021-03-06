package com.example.BangGuSeok_Chef.service.RecipeBoard;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeDto;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeContents;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeContentsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class RecipeContentsService {

    private final RecipeContentsRepository recipeContentsRepository;
    private final RecipeBoardRepository recipeBoardRepository;

    @Transactional
    public RecipeContents create(RecipeDto recipeDto, RecipeBoard recipeBoard) {
        recipeBoardRepository.findById(recipeDto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("레시피 상세 테이블 삽입 실패, 대상 게시글이 없습니다.!"));

        RecipeContents recipeContents = recipeDto.toRecipe_Contents(recipeBoard, recipeDto);

        return recipeContentsRepository.save(recipeContents);
    }

    @Transactional
    public RecipeContents modify(RecipeDto dto, RecipeBoard recipe_board, Long id) {
        recipeBoardRepository.findById(dto.getRecipe_id())
                .orElseThrow(() -> new IllegalArgumentException("레시피 상세 테이블 삽입 실패, 대상 게시글이 없습니다.!"));

        RecipeContents recipeContents = dto.toRecipe_Contents(recipe_board, dto);
        RecipeContents target = recipeContentsRepository.findContents(id);
        target.patch(recipeContents);

        return recipeContentsRepository.save(target);
    }
}
