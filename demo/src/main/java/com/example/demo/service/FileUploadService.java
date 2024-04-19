package com.example.demo.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileUploadService {
    List<String> uploadImages(List<MultipartFile> images);

}
