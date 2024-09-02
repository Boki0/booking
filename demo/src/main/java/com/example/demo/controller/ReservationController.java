package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.model.*;

import com.example.demo.service.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "api/")
public class ReservationController {
    private static final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    @Autowired
    ReservationService reservationService;

    @Autowired
    OfferService offerService;
    @Autowired
    ClientService clientService;

    @Autowired
    UserService userService;

    @Autowired
    DiscountService discountService;



   // @PreAuthorize("hasRole('CLIENT')")
    @PostMapping("newReservationUser/{clientId}/{offerId}")
    public ResponseEntity<Boolean> newReservationByUser(@PathVariable Integer clientId,
                                                        @PathVariable Integer offerId,
                                                        @RequestBody NewReservationDTO newReservation) {

        logger.warn("Client notfdsfsdfsf found for clientId: {}", clientId);
        Offer offer = offerService.findById(offerId);

        if (offer == null) {

            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }

        Client client = null;
        try {
            client = clientService.findById(clientId);
            // Log the result of the client retrieval
            if (client == null) {
                logger.warn("Client not found for clientId: {}", clientId);
                return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
            }
            logger.info("Client found for clientId: {}", client);
        } catch (Exception e) {
            logger.error("Error occurred while finding client with id: {}", clientId, e);
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }

        if (reservationService.makeNewReservationByOwner(offer, client, newReservation)) {
            return new ResponseEntity<>(true, HttpStatus.OK);   // ok
        }

        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    @PostMapping("newReservationOwner/{reservationId}/{offerId}")
    public ResponseEntity<Boolean> newReservationByOwner(@PathVariable Integer reservationId,
                                                         @PathVariable Integer offerId,
                                                         @RequestBody NewReservationDTO newReservation) {

        Reservation reservation = reservationService.findById(reservationId);
        if (reservation == null) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
        Offer offer = offerService.findById(offerId);
        if (offer == null) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }

        Client client = reservationService.findClientForReservation(reservation);
        if (client == null) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }

        if (reservationService.makeNewReservationByOwner(offer, client, newReservation)) {

            return new ResponseEntity<>(true, HttpStatus.OK);   // ok
        }

        return new ResponseEntity<>(false, HttpStatus.CONFLICT);
    }


    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    @GetMapping("reservation/client/{reservationId}")
    public ResponseEntity<ClientDTO> getClientForReservation(@PathVariable Integer reservationId) {

        Reservation reservation = reservationService.findById(reservationId);
        if (reservation == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        Client client = reservationService.findClientForReservation(reservation);
        if (client == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ClientDTO(client), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    @GetMapping("reservation/offer/{reservationId}")
    public ResponseEntity<OfferDTO> getOfferForReservation(@PathVariable Integer reservationId) {

        Reservation reservation = reservationService.findById(reservationId);
        if (reservation == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        Offer offer = reservationService.findOfferForReservation(reservation);
        if (offer == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new OfferDTO(offer), HttpStatus.OK);
    }


    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    @PostMapping("reservation/svcProvReport/{reservationId}")
    public ResponseEntity<Boolean> reportForClient(@PathVariable Integer reservationId, @RequestBody ResReportForClientDTO report) {
        Reservation reservation = reservationService.findById(reservationId);
        if (reservation == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        Offer offer = reservationService.findOfferForReservation(reservation);
        if (offer == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        Client client = reservationService.findClientForReservation(reservation);
        if (client == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        ServiceProvider svcProvider = reservationService.findOwnerOfOffer(offer);
        if (svcProvider == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        if (reservationService.makeNewReportForClient(report, client, svcProvider, reservation)) {
            return new ResponseEntity<>(true, HttpStatus.OK);   // ok
        }

        return new ResponseEntity<>(false, HttpStatus.CONFLICT);
    }


    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    @GetMapping("reservations/monthly/{userId}/{month}")
    public ResponseEntity<List<ReservationsForMonthDTO>> reservationsForMonth(@PathVariable Integer month, @PathVariable Integer userId) {

        List<ReservationsForMonthDTO> retList = new ArrayList<>();
        ServiceProvider svc = (ServiceProvider) userService.findById(userId);

        ReservationsForMonth reservations = reservationService.findReservationsForProviderForMonth(svc, month);

        for (Map.Entry<String, Integer> entry : reservations.getNumOfReservations().entrySet())
            retList.add(new ReservationsForMonthDTO(entry.getKey(), entry.getValue()));

        return new ResponseEntity<>(retList, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    @GetMapping("reservations/yearly/{userId}/{year}")
    public ResponseEntity<List<ReservationsForMonthDTO>> reservationsForYear(@PathVariable Integer year, @PathVariable Integer userId) {

        List<ReservationsForMonthDTO> retList = new ArrayList<>();
        ServiceProvider svc = (ServiceProvider) userService.findById(userId);

        ReservationsForMonth reservations = reservationService.findReservationsForProviderForYear(svc, year);

        for (Map.Entry<String, Integer> entry : reservations.getNumOfReservations().entrySet())
            retList.add(new ReservationsForMonthDTO(entry.getKey(), entry.getValue()));

        return new ResponseEntity<>(retList, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    @GetMapping("reservations/income/{userId}")
    public ResponseEntity<ReservationsIncome> incomeFromReservations(@PathVariable Integer userId,
                                                                     @RequestParam("dateFrom") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateFrom,
                                                                     @RequestParam("dateTo") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate dateTo) {

        ReservationsIncome income = new ReservationsIncome();
        ServiceProvider svc = (ServiceProvider) userService.findById(userId);

        List<ReservationOfferClient> reservationsForPeriod = reservationService.findReservationsInPeriodForProvider(svc, dateFrom, dateTo);
        for (ReservationOfferClient res : reservationsForPeriod) {
            income.setTotal(income.getTotal() + res.getReservation().getPrice());
            income.getReservations().add(new ReservationToList(res.getReservation(), res.getOffer(), res.getClient()));
        }

        return new ResponseEntity<>(income, HttpStatus.OK);
    }



    @PreAuthorize("hasRole('CLIENT')")
    @PostMapping("quickbooking")
    public ResponseEntity<Boolean> newReservationByQuickBooking(@RequestBody QuickResDto quickResDto) {


        Offer offer = offerService.findById(quickResDto.getOffer_id());
        if (offer == null) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }

        Client client = clientService.findById(quickResDto.getClient_id());
        if (client == null) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
        Discount dis = discountService.findById(quickResDto.getQres_id());

        NewReservationDTO nwr = new NewReservationDTO();
        nwr.setPrice(dis.getPrice());
        List<AdditionalServiceDTO> lista = new ArrayList<>();
        for(AdditionalService ad: dis.getChosenAdditionalServices())
            lista.add(new AdditionalServiceDTO(ad));
        nwr.setAdditionalServices(lista);
        nwr.setNumOfAttendants(offer.getCapacity());
        nwr.setStartDate(dis.getPeriod().getDateFrom());
        nwr.setEndDate(dis.getPeriod().getDateTo());



        if (reservationService.makeNewReservationFromQuick(offer, client, nwr, dis)) {
            discountService.delete(dis);
            return new ResponseEntity<>(true, HttpStatus.OK);   // ok
        }

        return new ResponseEntity<>(false, HttpStatus.CONFLICT);
    }




}
