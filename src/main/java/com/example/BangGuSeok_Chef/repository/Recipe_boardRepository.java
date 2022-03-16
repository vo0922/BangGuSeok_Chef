package com.example.BangGuSeok_Chef.repository;

import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Recipe_boardRepository extends JpaRepository<Recipe_Board, Long> {
    Optional<Recipe_Board>findByTitle(String title);
}
