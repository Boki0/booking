package com.example.demo.dto;

import com.example.demo.model.AdditionalService;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter

public class CottageRequest {
    private String cottageName;
    private String country;
    private String city;
    private String street;
    private String description;
    private int numOfRooms;
    private int capacity;
    private String regulations;
    private double price;
    private double fee;
    private Integer owner_id;
    private List<String> photos;
    private Set<AdditionalService> additionalServices;

}
