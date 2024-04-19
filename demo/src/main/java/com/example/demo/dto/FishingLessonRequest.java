package com.example.demo.dto;
import com.example.demo.model.AdditionalService;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class FishingLessonRequest {

    private String lessonName;
    private String country;
    private String city;
    private String street;
    private String description;
    private int capacity;
    private String regulations;
    private double price;
    private double fee;
    private Integer instructor_id;
    private List<String> photos;
    private Set<AdditionalService> additionalServices;
    private Set<String> fishingGear;
}
