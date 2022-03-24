package com.example.BangGuSeok_Chef.service.RecipeBoard;

import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeBoardDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeDto;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.CookStep;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.Ingredient;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeContents;
import com.example.BangGuSeok_Chef.repository.RecipeBoard.RecipeBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeBoardService {

    private final RecipeBoardRepository recipeBoardRepository;

    @Transactional
    public RecipeBoard create(RecipeDto dto) {
        RecipeBoard recipeBoard = dto.toRecipe();
        if(recipeBoard.getId() != null) {
            return null;
        }
        return recipeBoardRepository.save(recipeBoard);
    }

    // 전체
    @Transactional
    public List<RecipeBoardDto> index(Pageable pageable){

        return recipeBoardRepository.findAll(pageable)
                .stream()
                .map(recipeBoard -> RecipeBoardDto.createRecipeBoardDto(recipeBoard))
                .collect(Collectors.toList());
    }

    // 제목 검색
    @Transactional
    public List<RecipeBoardDto> search(String keyword, Pageable pageable){
        return recipeBoardRepository.findByTitleContaining(keyword, pageable)
                .stream()  // 변환 : 엔티티 -> DTO
                .map(recipeBoard -> RecipeBoardDto.createRecipeBoardDto(recipeBoard))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<RecipeBoardDto> categorySearch(String category, Pageable pageable){
        return recipeBoardRepository.findByCategoryContaining(category, pageable)
                .stream()
                .map(recipeBoard -> RecipeBoardDto.createRecipeBoardDto(recipeBoard))
                .collect(Collectors.toList());
    }

    @Transactional
    public RecipeBoard join(RecipeBoard recipe_board, List<CookStep> cookSteps, List<Ingredient> ingredient, RecipeContents recipeContents) {
        recipe_board.recipejoin(cookSteps, ingredient, recipeContents);
        return recipeBoardRepository.save(recipe_board);
    }

    @Transactional
    public void delete(Long id) {
        RecipeBoard recipeBoard = recipeBoardRepository.findById(id).orElse(null);
        recipeBoardRepository.delete(recipeBoard);
    }
}
