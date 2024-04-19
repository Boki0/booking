package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;


@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    OfferRepository offerRepository;

    @Autowired
    ServiceProviderRepository serviceProviderRepo;

    @Autowired
    ReservationReportForClientRepository reportsForClientRepository;

    @Autowired
    AdditionalServicesService additionalServicesService;

    @Autowired
    OfferService offerService;

    @Autowired
    EmailService emailService;


    @Override
    public Reservation findById(Integer reservationId) {
        return reservationRepository.findById(reservationId).orElse(null);
    }

    @Override
    public Client findClientForReservation(Reservation reservation) {
        for (Client client : clientRepository.findAll())
            for (Reservation res : client.getReservations())
                if (res.getId() == reservation.getId())
                    return client;
        return null;
    }

    @Override
    public Offer findOfferForReservation(Reservation reservation) {
        for (Offer offer : offerRepository.findAll())
            for (Reservation res : offer.getReservations())
                if (res.getId() == reservation.getId())
                    return offer;
        return null;
    }

    @Override
    public ServiceProvider findOwnerOfOffer(Offer offer) {
        for (ServiceProvider provider : serviceProviderRepo.findAll())
            for (Offer o : provider.getOffers())
                if (o.getId() == offer.getId()) return provider;

        return null;
    }

    @Override

    public List<ReservationReportForClient> getPenaltyRequestsByType(ReportForClientType type) {
        List<ReservationReportForClient> reportsByType = new ArrayList<>();
        List<ReservationReportForClient> allResReports = this.reportsForClientRepository.findAll();
        for (ReservationReportForClient resReport : allResReports) {
            if (resReport.getType().equals(type))
                reportsByType.add(resReport);
        }

        return reportsByType;
    }

    @Override
    public ReservationReportForClient findReservationReportById(Integer penaltyReqId) {
        return reportsForClientRepository.findById(penaltyReqId).orElse(null);
    }

    @Override
    public void removeReservationReport(ReservationReportForClient rrfc) {
        rrfc.setDeleted(true);
        this.reportsForClientRepository.save(rrfc);
    }

    public ReservationsForMonth findReservationsForProviderForMonth(ServiceProvider svc, Integer month) {

        ReservationsForMonth resForMonth = new ReservationsForMonth(month);

        for (Offer offer : svc.getOffers()) {
            for (Reservation reservation : offer.getReservations()) {
                if (reservation.getReservationPeriod().getDateFrom().getMonthValue() == month) {

                    LocalDate startDate = reservation.getReservationPeriod().getDateFrom();
                    int lenOfMonth = startDate.lengthOfMonth();
                    for (int i = startDate.getDayOfMonth(); i <= lenOfMonth; i++) {

                        String key = String.valueOf(i) + ". " + String.valueOf(month) + ".";

                        if (startDate.isBefore(reservation.getReservationPeriod().getDateTo()))
                        //  || startDate.isEqual(reservation.getReservationPeriod().getDateTo())) {    // da li treba i equal?
                        {
                            resForMonth.getNumOfReservations().put(key, resForMonth.getNumOfReservations().get(key) + 1);

                            startDate = startDate.plusDays(1);
                        } else {
                            break;
                        }
                    }
                } else if (reservation.getReservationPeriod().getDateTo().getMonthValue() == month) {
                    LocalDate endDate = reservation.getReservationPeriod().getDateTo();
                    for (int i = endDate.getDayOfMonth(); i > 0; i--) {

                        String key = String.valueOf(i) + ". " + String.valueOf(month) + ".";

                        if (endDate.isAfter(reservation.getReservationPeriod().getDateFrom()) ||
                                endDate.isEqual(reservation.getReservationPeriod().getDateFrom())) {

                            resForMonth.getNumOfReservations().put(key, resForMonth.getNumOfReservations().get(key) + 1);

                            endDate = endDate.minusDays(1);
                        } else {
                            break;
                        }
                    }
                }
            }
        }
        return resForMonth;
    }

    @Override
    public ReservationsForMonth findReservationsForProviderForYear(ServiceProvider svc, Integer year) {
        ReservationsForMonth resForMonth = new ReservationsForMonth();

        for (Offer offer : svc.getOffers()) {
            for (Reservation reservation : offer.getReservations()) {
                if (reservation.getReservationPeriod().getDateFrom().getYear() == year) {

                    String month = reservation.getReservationPeriod().getDateFrom().getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
                    resForMonth.getNumOfReservations().put(month, resForMonth.getNumOfReservations().get(month) + 1);
                } else if (reservation.getReservationPeriod().getDateTo().getYear() == year) {
                    String month = reservation.getReservationPeriod().getDateTo().getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
                    resForMonth.getNumOfReservations().put(month, resForMonth.getNumOfReservations().get(month) + 1);
                }
            }
        }

        return resForMonth;
    }

    @Override
    public List<ReservationOfferClient> findReservationsInPeriodForProvider(ServiceProvider svc, LocalDate dateFrom, LocalDate dateTo) {
        List<ReservationOfferClient> reservations = new ArrayList<>();

        for (Offer offer : svc.getOffers()) {
            for (Reservation res : offer.getReservations()) {
                if (res.getReservationPeriod().isBetween(dateFrom, dateTo)) {
                    reservations.add(new ReservationOfferClient(res, findClientForReservation(res), offer));
                }
            }
        }
        return reservations;

    }

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    public List<Reservation> getPassedReservations() {
        List<Reservation> retList = new ArrayList<>();
        List<Reservation> allReservations = reservationRepository.findAll();
        for(Reservation reservation : allReservations)
        {
            if (reservation.getReservationPeriod().getDateTo().isBefore(LocalDate.now()))
                retList.add(reservation);
        }

        return retList;
    }

    @Override
    public int getTotalCashFlow(List<Reservation> allPassedReservations) {

        int totalCashFlow = 0;

        for(Reservation reservation : allPassedReservations)
        {
            totalCashFlow += reservation.getPrice();
            for(AdditionalService additionalService : reservation.getChosenAdditionalServices())
                totalCashFlow += additionalService.getPrice();
        }

        return totalCashFlow;
    }

    @Override
    public boolean makeNewReportForClient(ResReportForClientDTO report, Client client, ServiceProvider svcProvider,
                                          Reservation reservation) {

        ReservationReportForClient rep = new ReservationReportForClient();
        rep.setClient(client);
        rep.setReservation(reservation);
        rep.setComment(report.getComment());
        rep.setServiceProvider(svcProvider);
        if (report.getReportType() == 0) {
            rep.setType(ReportForClientType.BAD_USER);  // ovo ide kod admina pa ako on odobri klijent ce dobiti penal
        } else if (report.getReportType() == 1) {
            rep.setType(ReportForClientType.USER_DID_NOT_SHOW_UP);
            client.setNumOfPenalties(client.getNumOfPenalties() + 1);
        }
        else{
            rep.setType(ReportForClientType.OK_REPORT);
        }

        reservation.setHasOwnerRated(true);
        reportsForClientRepository.save(rep);

        return true;
    }


    @Override
    public boolean makeNewReservationByOwner(Offer offer, Client client, NewReservationDTO newReservation) {

        if (!offerService.isPeriodAvailable(newReservation.getStartDate(), newReservation.getEndDate(), offer)) {
            return false;
        }
        Reservation newRes = new Reservation();
        Period period = new Period(newReservation.getStartDate(), newReservation.getEndDate());
        newRes.setReservationPeriod(period);

        Set<AdditionalService> additionalServices = new HashSet<>();
        for (AdditionalServiceDTO service : newReservation.getAdditionalServices()) {
            additionalServices.add(additionalServicesService.findById(service.getValue()));
        }
        newRes.setChosenAdditionalServices(additionalServices);

        newRes.setHasOwnerRated(false);
        newRes.setHasClientRated(false);
        newRes.setNumOfAttendants(newReservation.getNumOfAttendants());
        newRes.setPrice(newReservation.getPrice());

        offer.getReservations().add(newRes);
        offer.getPeriodsOfOccupancy().add(period);

        client.getReservations().add(newRes);

        emailService.sendReservationConfirmationToClient(client, offer, newRes);

        reservationRepository.save(newRes);

        return true;
    }
    @Override
    public boolean allowsCancellation(Reservation res){
        LocalDate in3 = LocalDate.now().plusDays(2);
        if(res.getReservationPeriod().getDateFrom().isAfter(in3))
            return true;
        return false;
    }

    @Override
    public void deleteRes(Reservation res){
        reservationRepository.delete(res);
    }



    @Override
    public boolean makeNewReservationFromQuick(Offer offer, Client client, NewReservationDTO newReservation, Discount dis) {


        Reservation newRes = new Reservation();
        Period period = new Period(newReservation.getStartDate(), newReservation.getEndDate());
        newRes.setReservationPeriod(period);

        Set<AdditionalService> additionalServices = new HashSet<>();
        for (AdditionalServiceDTO service : newReservation.getAdditionalServices()) {
            additionalServices.add(additionalServicesService.findById(service.getValue()));
        }
        newRes.setChosenAdditionalServices(additionalServices);

        newRes.setHasOwnerRated(false);
        newRes.setHasClientRated(false);
        newRes.setNumOfAttendants(newReservation.getNumOfAttendants());
        newRes.setPrice(newReservation.getPrice());

        offer.getPeriodsOfOccupancy().add(period);
        offer.getReservations().add(newRes);
        client.getReservations().add(newRes);
        offer.getDiscounts().remove(dis);




        emailService.sendReservationConfirmationToClient(client, offer, newRes);

        reservationRepository.save(newRes);

        return true;
    }









}