package com.example.demo.dto;

import com.example.demo.model.Address;
import com.example.demo.model.Client;
import com.example.demo.model.LoyaltyProgram;
import com.example.demo.model.Rating;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientDTO {

    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Address address;
    private String phoneNumber;
    private Rating rating;
    private int numOfPenalties;
    private LoyaltyProgram loyaltyProgram;


    public ClientDTO(Client client) {
        id = client.getId();
        firstName = client.getFirstName();
        lastName = client.getLastName();
        email = client.getEmail();
        address = client.getAddress();
        phoneNumber = client.getPhoneNumber();
        rating = client.getRating();
        numOfPenalties = client.getNumOfPenalties();
        loyaltyProgram = client.getLoyaltyProgram();
    }
    // slika?
}
