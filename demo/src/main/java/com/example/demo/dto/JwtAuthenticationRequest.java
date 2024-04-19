package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

//DTO za login
@Getter
@Setter
public class JwtAuthenticationRequest {

    private String email;
    private String password;

    public JwtAuthenticationRequest() {
        super();
    }

    public JwtAuthenticationRequest(String email, String password) {
        this.setEmail(email);
        this.setPassword(password);
    }
}