package com.example.BangGuSeok_Chef.repository.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecipeBoardRepository extends JpaRepository<RecipeBoard, Long> {
    Optional<RecipeBoard>findByTitle(String title);

    // 검색
//    @Query(value = "Select * from recipe_board where title like %:keyword%", nativeQuery = true)
//    List<RecipeBoard>findByKeyword(String keyword);

    List<RecipeBoard>findByTitleContaining(String keyword, Pageable pageable);

    List<RecipeBoard>findByCategoryContaining(String category, Pageable pageable);

}
