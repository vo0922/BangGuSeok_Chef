package com.example.BangGuSeok_Chef.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;


    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    @Transactional
    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)  // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));

        return upload(uploadFile, dirName);
    }

    // S3로 파일 업로드하기
    private String upload(File uploadFile, String dirName) {
        String fileName = dirName + "/" + uploadFile.getName();   // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, fileName); // s3로 업로드
        removeNewFile(uploadFile);

        return uploadImageUrl;
    }
    @Transactional
    public List<String> CookStepUpload(List<MultipartFile> multipartFile, String dirName) throws IOException {
        List<File> uploadFile = new ArrayList<>();
        for (MultipartFile files : multipartFile) {
            uploadFile.add(convert(files)  // 파일 변환할 수 없으면 에러
                    .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail")));
        }

        return CookStepUploads(uploadFile, dirName);
    }

    // S3로 파일 업로드하기
    private List<String> CookStepUploads(List<File> uploadFile, String dirName) {
        String noimageURL = "https://recipeboard-image.s3.ap-northeast-2.amazonaws.com/cookstepimage/noimage.png";
        log.info("cookstepuploads 함수 실행");
        List<String> uploadImageUrl = new ArrayList<>();
        uploadFile.forEach(file -> {
            if(file.getName().contains("noimage")){
                uploadImageUrl.add(noimageURL);
            }
            else{
                uploadImageUrl.add(putS3(file, (dirName + "/" + file.getName())));
            }
            removeNewFile(file);
        });
        return uploadImageUrl;
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(System.getProperty("user.dir") + "/" + UUID.randomUUID() + file.getOriginalFilename());
        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }

//    public void delete(String filename) {
//        log.info(filename);
//        DeleteObjectRequest request = new DeleteObjectRequest(bucket, filename);
//        amazonS3Client.deleteObject(request);
//    }
}

