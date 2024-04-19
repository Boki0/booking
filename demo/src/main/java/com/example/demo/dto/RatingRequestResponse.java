package com.example.demo.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RatingRequestResponse {
    private Integer offerId;
    private String offerName;
    private String providerEmail;
    private double ratingValue;
    private String comment;
    private String clientEmail;
}
