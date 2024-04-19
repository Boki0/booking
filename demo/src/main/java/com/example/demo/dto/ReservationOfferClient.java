package com.example.demo.dto;

import com.example.demo.model.Client;
import com.example.demo.model.Offer;
import com.example.demo.model.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationOfferClient {

    private Reservation reservation;
    private Client client;
    private Offer offer;

}
