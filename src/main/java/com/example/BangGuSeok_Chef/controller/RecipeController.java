package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.RecipeDto;
import com.example.BangGuSeok_Chef.entity.Recipe_Board;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {



    @PostMapping("/api/board/create")
    public ResponseEntity<Recipe_Board> post(@RequestBody RecipeDto dto) {

        return null;
    }

}
