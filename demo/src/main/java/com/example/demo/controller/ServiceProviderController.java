package com.example.demo.controller;

import com.example.demo.dto.OfferToList;
import com.example.demo.dto.RerevationToListForClients;
import com.example.demo.dto.ReservationToList;
import com.example.demo.model.*;
import com.example.demo.service.OfferService;
import com.example.demo.service.ReservationService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/")
public class ServiceProviderController {

    @Autowired
    private UserService userService;

    @Autowired
    private OfferService offerService;

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/my-offers/{userId}")
    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    public ResponseEntity<List<OfferToList>> loadOffers(@PathVariable Integer userId) {
        List<OfferToList> retList = new ArrayList<>();
        ServiceProvider u = (ServiceProvider) userService.findById(userId);

        if (u == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Offer> offers = userService.findUsersOffers(u);
        for (Offer o : offers) {
            retList.add(new OfferToList(o));
        }

        return new ResponseEntity<>(retList, HttpStatus.OK);
    }

    @DeleteMapping("/my-offers/{offerId}")
    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    public ResponseEntity deleteOffer(@PathVariable Integer offerId) {
        try {
            Offer offer = offerService.findById(offerId);
            if (offer == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            offerService.deleteOffer(offer);

        } catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/provider-reserved/{providerId}")
    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    public ResponseEntity<Boolean> isServiceProviderReserved(@PathVariable Integer providerId)
    {
        ServiceProvider serviceProvider = (ServiceProvider) userService.findById(providerId);
        boolean isReserved = this.userService.isProviderReserved(serviceProvider);
        return new ResponseEntity<>(isReserved, HttpStatus.OK);
    }

    @GetMapping("/reservations/{history}/{userId}")
    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    public ResponseEntity<List<ReservationToList>> loadReservationHistory(@PathVariable String history, @PathVariable Integer userId) {
        List<ReservationToList> retList = new ArrayList<>();
        ServiceProvider u = (ServiceProvider) userService.findById(userId);

        if (u == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Reservation> reservations = (history.equalsIgnoreCase("history")) ?
            userService.getReservationHistory(userService.findUsersReservations(u)) :
            userService.getFutureReservations(userService.findUsersReservations(u));

        for (Reservation r : reservations) {
            Offer offer = offerService.findOfferForReservation(r);
            Client client = userService.findClientForReservation(r);    // ne znam da li ovo moze brze
            retList.add(new ReservationToList(r, offer, client));
        }

        return new ResponseEntity<>(retList, HttpStatus.OK);
    }

    @GetMapping("/reservations-of-user/{history}/{userId}/{type}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<List<RerevationToListForClients>> loadReservationHistoryOfUser(@PathVariable String history, @PathVariable Integer userId, @PathVariable String type) {
        List<RerevationToListForClients> retList = new ArrayList<>();
        Client client = (Client) userService.findById(userId);

        if (client == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Reservation> allreservations = (history.equalsIgnoreCase("history")) ?
                userService.getReservationHistory(client.getReservations()) :
                userService.getFutureReservations(client.getReservations());

        List<Reservation> reservations = new ArrayList<>();
        if(history.equalsIgnoreCase("history")){
            for (Reservation r : allreservations) {
                if(type.equalsIgnoreCase("cott"))
                {
                    Offer offer = offerService.findOfferForReservation(r);
                    if(offer.getClass()==Cottage.class){
                        reservations.add(r);
                    }
                }
                if(type.equalsIgnoreCase("boat"))
                {
                    Offer offer = offerService.findOfferForReservation(r);
                    if(offer.getClass()==Boat.class){
                        reservations.add(r);
                    }
                }
                if(type.equalsIgnoreCase("less"))
                {
                    Offer offer = offerService.findOfferForReservation(r);
                    if(offer.getClass()== FishingLesson.class){
                        reservations.add(r);
                    }
                }
        }}
        else {
            reservations = allreservations;
        }

        for (Reservation r : reservations) {
            Offer offer = offerService.findOfferForReservation(r);
            retList.add(new RerevationToListForClients(r, offer));
        }

        return new ResponseEntity<>(retList, HttpStatus.OK);
    }






}
