package com.example.BangGuSeok_Chef.service;

import com.example.BangGuSeok_Chef.dto.Recipe_BoardDto;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import com.example.BangGuSeok_Chef.repository.Recipe_boardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class Recipe_boardService {
    @Autowired
    private Recipe_boardRepository recipe_boardRepository;

    @Transactional
    public Recipe_Board create(Recipe_BoardDto dto) {
        Recipe_Board recipe_board = dto.toEntity();
        if(recipe_board.getId() != null) {
            return null;
        }
        return recipe_boardRepository.save(recipe_board);
    }
}
