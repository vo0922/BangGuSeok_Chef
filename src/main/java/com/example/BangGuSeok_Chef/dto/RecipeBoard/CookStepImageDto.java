package com.example.BangGuSeok_Chef.dto.RecipeBoard;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class CookStepImageDto {
    private List<ImageDto> imageDtos;
}
