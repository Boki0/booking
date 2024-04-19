package com.example.demo.dto;

import com.example.demo.model.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfferDTO {

    private Integer id;
    private String name;
    private Address address;
    private int capacity;
    private double price;
    private double cancellationFee;
    private String regulations;
    private String description;
    private Rating rating;
    private List<String> images;
    private PeriodsOfOccupancy periodsOfOccupancy;
    private Set<AdditionalService> additionalServices;
    private List<ClientDTO> subscribedClients;

    public OfferDTO(Offer offer){
        id = offer.getId();
        name = offer.getName();
        address = offer.getAddress();
        capacity = offer.getCapacity();
        price = offer.getPrice();
        cancellationFee = offer.getCancellationFee();
        regulations = offer.getRegulations();
        description = offer.getDescription();
        rating = offer.getRating();
        images = offer.getImages();
        periodsOfOccupancy = new PeriodsOfOccupancy(offer.getReservations(), offer.getDiscounts(), offer.getPeriodsOfOccupancy());
        additionalServices = offer.getAdditionalServices();
        subscribedClients = new ArrayList<>();

        for(Client c : offer.getSubscribedClients()){
            subscribedClients.add(new ClientDTO(c));
        }
    }

}
