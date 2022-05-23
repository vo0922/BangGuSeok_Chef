package com.example.BangGuSeok_Chef.repository.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeContents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecipeContentsRepository extends JpaRepository<RecipeContents, Long> {

    @Query(value="select *from recipe_contents where recipe_id = :id", nativeQuery = true)
    RecipeContents findContents(Long id);
}
