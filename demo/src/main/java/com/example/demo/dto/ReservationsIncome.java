package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor

public class ReservationsIncome {

    private double total;
    private List<ReservationToList> reservations;

    public ReservationsIncome(){
        total = 0;
        reservations = new ArrayList<>();
    }

}
