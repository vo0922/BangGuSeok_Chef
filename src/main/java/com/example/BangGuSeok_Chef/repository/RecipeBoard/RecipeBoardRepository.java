package com.example.BangGuSeok_Chef.repository.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecipeBoardRepository extends JpaRepository<RecipeBoard, Long> {
    Optional<RecipeBoard>findByTitle(String title);
}
