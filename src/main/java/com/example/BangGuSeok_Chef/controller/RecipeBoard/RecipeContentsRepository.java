package com.example.BangGuSeok_Chef.controller.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeContents;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeContentsRepository extends JpaRepository<RecipeContents, Long> {
}
