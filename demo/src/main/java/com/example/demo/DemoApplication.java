package com.example.demo;

import com.example.demo.config.FileUploadConfig;
import com.example.demo.model.*;
import com.example.demo.repository.BoatOwnerRepository;
import com.example.demo.repository.CottageOwnerRepository;
import com.example.demo.repository.FishingInstructorRepository;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        new File(FileUploadConfig.uploadDirectory).mkdir();
        SpringApplication.run(DemoApplication.class, args);
    }

}
