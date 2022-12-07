package com.example.BangGuSeok_Chef.repository.FreeBoard;

import com.example.BangGuSeok_Chef.entity.FreeBoard.FreeBoard;
import com.example.BangGuSeok_Chef.entity.RecipeBoard.RecipeBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long> {
}
