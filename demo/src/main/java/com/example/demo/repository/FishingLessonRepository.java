package com.example.demo.repository;

import com.example.demo.model.FishingLesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishingLessonRepository extends JpaRepository<FishingLesson, Integer> {

    List<FishingLesson> findByAddressCityIgnoreCase(String city);


    List<FishingLesson> findTop4ByOrderByRatingAverageAsc();
}
