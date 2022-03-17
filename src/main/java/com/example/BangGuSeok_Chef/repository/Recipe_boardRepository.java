package com.example.BangGuSeok_Chef.repository;

import com.example.BangGuSeok_Chef.entity.RecipeBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Recipe_boardRepository extends JpaRepository<RecipeBoard, Long> {
    Optional<RecipeBoard>findByTitle(String title);
}
