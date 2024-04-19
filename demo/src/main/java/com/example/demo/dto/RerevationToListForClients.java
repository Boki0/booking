

package com.example.demo.dto;

import com.example.demo.model.Offer;
import com.example.demo.model.Period;
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
public class RerevationToListForClients {

    private Integer id;
    private String offerName;
    private String city;
    private Double price;
    private String status;
    private Integer capacity;
    private String img;
    private String period;
    private boolean hasClientRated;
    private boolean hasOwnerRated;

    public RerevationToListForClients(Reservation r, Offer offer) {
        this.id = r.getId();
        this.offerName = offer.getName();
        this.city = offer.getAddress().getCity();
        this.price = r.getPrice();
        this.status = setStatus(r.getReservationPeriod());
        this.capacity = r.getNumOfAttendants();
        this.img = (offer.getImages().size() > 0) ? offer.getImages().get(0) : null;
        this.period = r.getReservationPeriod().toString();
        this.hasClientRated = r.isHasClientRated();
        this.hasOwnerRated = r.isHasOwnerRated();
    }

    private String setStatus(Period reservationPeriod) { // da li je rezervacija u toku
        // da vlasnik moze da produzi ako jeste
        if ((reservationPeriod.getDateFrom().isBefore(LocalDate.now())) && reservationPeriod.getDateTo().isAfter(LocalDate.now()))
            return "now";

        if ((reservationPeriod.getDateFrom().isEqual(LocalDate.now())) || reservationPeriod.getDateTo().isEqual(LocalDate.now()))
            return "now";

        if ((reservationPeriod.getDateTo().isBefore(LocalDate.now())))
            return "passed";

        return "not_passed";
    }

}
