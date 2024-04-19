package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class NewReservationDTO {

    private LocalDate startDate;
    private LocalDate endDate;
    private double price;
    private int numOfAttendants;
    private List<AdditionalServiceDTO> additionalServices;
}
