package com.example.demo.service;

import com.example.demo.dto.FishingLessonRequest;
import com.example.demo.model.FishingLesson;

import java.util.List;

public interface FishingLessonService {
    public FishingLesson findById(Integer id);
    FishingLesson editFishingLesson(FishingLesson fishingLesson, FishingLessonRequest fishingLessonRequest);

    public List<FishingLesson> findAllByCityAndDateAnd(String c, String start, String end, int min, int max, int guests);

    List<FishingLesson> findAll();

    public Integer countFishingLessonByCity(String c);

    public List<FishingLesson> fourOffers();


    void deleteFishingLesson(FishingLesson fishingLesson);
}
