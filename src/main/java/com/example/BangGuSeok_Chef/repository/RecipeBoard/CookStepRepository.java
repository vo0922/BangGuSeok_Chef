package com.example.BangGuSeok_Chef.repository.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.CookStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CookStepRepository extends JpaRepository<CookStep, Long> {
    @Query(value="select *from cook_step where recipe_id = :id", nativeQuery = true)
    List<CookStep> findCookStepRecipe(Long id);
}
