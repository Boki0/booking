package com.example.demo.service;

import com.example.demo.config.FileUploadConfig;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileUploadServiceImpl implements FileUploadService{

    @Override
    public List<String> uploadImages(List<MultipartFile> images) {
        List<String> fileNames = new ArrayList<String>();
        for (MultipartFile file : images){
            String fileName = file.getOriginalFilename();
            Path fileNameAndPath = Paths.get(FileUploadConfig.uploadDirectory, fileName);
            int id = 0;
            while(Files.exists(fileNameAndPath)) {
                fileName = "(" + id++ + ")" + file.getOriginalFilename();
                fileNameAndPath = Paths.get(FileUploadConfig.uploadDirectory, fileName);
            }
            fileNames.add(fileName);
            try{
                Files.write(fileNameAndPath, file.getBytes());
            } catch (IOException e){
                e.printStackTrace();
                return null;
            }
        }
        return fileNames;
    }
}
