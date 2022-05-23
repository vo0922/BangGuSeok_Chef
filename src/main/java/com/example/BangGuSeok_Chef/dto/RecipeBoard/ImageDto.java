package com.example.BangGuSeok_Chef.dto.RecipeBoard;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class ImageDto {
    private Long id;
    private MultipartFile file;
}
