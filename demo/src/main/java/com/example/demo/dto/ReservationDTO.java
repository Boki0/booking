package com.example.demo.dto;

import com.example.demo.model.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {

    //private ClientDTO client;
    private String text;
    private LocalDate startDate;
    private LocalDate endDate;
    private int typeId;


    public ReservationDTO(Reservation r) {
//        client = new ClientDTO(r.getClient());
        this.text = "Reserved";
        this.startDate = r.getReservationPeriod().getDateFrom();
//        this.startDate = LocalDate.parse("2022-06-21");

        this.endDate = r.getReservationPeriod().getDateTo();
//        this.endDate = LocalDate.parse("2022-06-25");

        this.typeId = 3;    // na frontu ovo znaci obicna rezervacija
    }
}
