package com.example.demo.dto;

import com.example.demo.model.Client;
import com.example.demo.model.LoyaltyProgram;
import com.example.demo.model.Rating;
import com.example.demo.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAllDTO {

    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String city;
    private String street;
    private String country;
    private String phoneNumber;
    private Rating rating;


    public UserAllDTO(User user) {
        id = user.getId();
        firstName = user.getFirstName();
        lastName = user.getLastName();
        email = user.getEmail();
        country = user.getAddress().getCountry();
        street = user.getAddress().getStreet();
        city = user.getAddress().getCity();

        phoneNumber = user.getPhoneNumber();
        rating = user.getRating();
    }
    // slika?
}
