package com.example.BangGuSeok_Chef.controller.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

}