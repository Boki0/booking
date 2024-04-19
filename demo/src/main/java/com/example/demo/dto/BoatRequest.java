package com.example.demo.dto;

import com.example.demo.model.AdditionalService;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class BoatRequest {

    private String name;
    private String country;
    private String city;
    private String street;
    private String description;
    private String regulations;
    private String boatType;
    private Integer engineNum;

    private int capacity;
    private Integer owner_id;

    private double price;
    private double fee;
    private double length;
    private double enginePow;
    private double maxSpeed;

    private List<String> photos;

    private Set<AdditionalService> additionalServices;
    private Set<String> fishingGear;
    private Set<String> navGear;

}
