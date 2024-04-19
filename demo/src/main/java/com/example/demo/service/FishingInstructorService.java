package com.example.demo.service;

import com.example.demo.dto.FishingLessonRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.model.Client;
import com.example.demo.model.FishingInstructor;
import com.example.demo.model.FishingLesson;
import com.example.demo.model.User;

import java.util.List;

public interface FishingInstructorService {
    FishingInstructor findById(Integer id);
    FishingInstructor findByEmail(String email);
    List<FishingInstructor> findAll ();
    FishingInstructor save(User user, UserRequest userRequest);

    User updateUser(User user);

    FishingLesson addFishingLesson(FishingLessonRequest fishingLessonRequest, FishingInstructor fI);
}
