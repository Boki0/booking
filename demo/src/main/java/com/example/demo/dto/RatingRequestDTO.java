package com.example.demo.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RatingRequestDTO {
    private Integer reservationId;
    private double ratingOfUser;
    private String commentOfUser;
}
