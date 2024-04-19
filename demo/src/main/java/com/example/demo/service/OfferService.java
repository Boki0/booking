package com.example.demo.service;

import com.example.demo.dto.NewDiscountDTO;
import com.example.demo.dto.PeriodDTO;
import com.example.demo.dto.RatingRequestResponse;
import com.example.demo.model.Offer;
import com.example.demo.model.Reservation;

import java.time.LocalDate;

public interface OfferService {

    Offer findById(Integer id);

    void deleteOffer(Offer offer);

    Offer addDiscountToOffer(Offer offer, NewDiscountDTO newDiscount);

    Offer addUnavailablePeriod(Offer offer, PeriodDTO newPeriod);

    Offer findOfferForReservation(Reservation r);
    void save(Offer o);

    boolean isPeriodAvailable(LocalDate startDate, LocalDate endDate, Offer offer);

    void changeOfferRating(Offer offer, RatingRequestResponse ratingRequestResponse);
}
