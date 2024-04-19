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
public class NewDiscountDTO {

    private LocalDate startDate;
    private LocalDate endDate;
    private double price;
    private List<AdditionalServiceDTO> additionalServices;

}
