package com.example.BangGuSeok_Chef.controller;

import com.example.BangGuSeok_Chef.dto.MyInformation.MyinformationDto;
import com.example.BangGuSeok_Chef.dto.RecipeBoard.RecipeBoardDto;
import com.example.BangGuSeok_Chef.service.MyInformation.MyInformationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MyInformationController {
    private final MyInformationService myInformationService;

    @GetMapping("/api/myinformation/{email}")
    public ResponseEntity<MyinformationDto> myinformationData(@PathVariable String email){
        log.info("조회 id : " + email);
        MyinformationDto dtos = myInformationService.information(email);

        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

    @GetMapping("/api/myinformation/posts/{email}")
    public ResponseEntity<RecipeBoardDto> myRecipeData(@PathVariable String email){
        RecipeBoardDto dtos = myInformationService.posts(email);

        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

}
