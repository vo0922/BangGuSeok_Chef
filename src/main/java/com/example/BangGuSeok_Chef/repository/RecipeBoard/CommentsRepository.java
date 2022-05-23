package com.example.BangGuSeok_Chef.repository.RecipeBoard;

import com.example.BangGuSeok_Chef.entity.RecipeBoard.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentsRepository extends JpaRepository<Comments, Long> {

    @Query(value="select count(*) from comments where recipe_id = :id", nativeQuery = true)
    Integer countRecipeId(Long id);


}
