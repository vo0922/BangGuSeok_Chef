package com.example.BangGuSeok_Chef.repository.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Query(value="select *from ingredient where recipe_id = :id", nativeQuery = true)
    List<Ingredient> findIngredientRecipe(Long id);
}
