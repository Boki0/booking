package com.example.demo.dto;

import com.example.demo.model.Cottage;
import com.example.demo.model.Offer;
import com.example.demo.model.Reservation;
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
public class OfferToList {

    Integer id;
    String name;
    String city;
    Double rating;
    Double price;
    String status;
    Integer capacity;
    String img;

    public OfferToList(Offer o){
        this.id = o.getId();
        this.name = o.getName();
        this.city = o.getAddress().getCity();
        this.rating = o.getRating().getAverage();
        this.price = o.getPrice();
        this.status = setStatus(o.getReservations());
        this.capacity = o.getCapacity();
        this.img = (o.getImages().size() > 0) ? o.getImages().get(0) : null;

    }

    private String setStatus(List<Reservation> reservations) {
        String retString = "no_reservations";

        for (Reservation reservation: reservations) {
            if (reservation.getReservationPeriod().getDateTo().isAfter(LocalDate.now())){
                retString = "reserved";
                break;
            }
        }

        return retString;
    }
}
