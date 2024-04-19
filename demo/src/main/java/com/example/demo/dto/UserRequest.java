package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

// DTO koji preuzima podatke iz HTML forme za registraciju
@Getter
@Setter
public class UserRequest {

    private String password;

    private String firstName;

    private String lastName;

    private String email;

    private String country;

    private String city;

    private String street;

    private String phoneNumber;

    private String type;

    private String explanation;
}