package com.example.demo.service;

import com.example.demo.dto.NewReservationDTO;
import com.example.demo.dto.ResReportForClientDTO;
import com.example.demo.dto.ReservationOfferClient;
import com.example.demo.dto.ReservationsForMonth;
import com.example.demo.model.*;

import java.time.LocalDate;
import java.util.List;


public interface ReservationService {
    Reservation findById(Integer reservationId);

    Client findClientForReservation(Reservation reservation);

    Offer findOfferForReservation(Reservation reservation);

    boolean makeNewReportForClient(ResReportForClientDTO report, Client client, ServiceProvider svcProvider, Reservation reservation);

    boolean makeNewReservationByOwner(Offer offer, Client client, NewReservationDTO newReservation);

    boolean makeNewReservationFromQuick(Offer offer, Client client, NewReservationDTO newReservation, Discount dis);

    ServiceProvider findOwnerOfOffer(Offer offer);

    List<ReservationReportForClient> getPenaltyRequestsByType(ReportForClientType type);

    ReservationReportForClient findReservationReportById(Integer penaltyReqId);

    void removeReservationReport(ReservationReportForClient rrfc);
    ReservationsForMonth findReservationsForProviderForMonth(ServiceProvider svc, Integer month);

    ReservationsForMonth findReservationsForProviderForYear(ServiceProvider svc, Integer year);

    List<ReservationOfferClient> findReservationsInPeriodForProvider(ServiceProvider svc, LocalDate dateFrom, LocalDate dateTo);

    List<Reservation> findAll();

    List<Reservation> getPassedReservations();

    int getTotalCashFlow(List<Reservation> allPassedReservations);

    boolean allowsCancellation(Reservation res);

    void deleteRes(Reservation res);

}
