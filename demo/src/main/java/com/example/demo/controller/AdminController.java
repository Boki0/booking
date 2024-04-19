package com.example.demo.controller;
import com.example.demo.dto.*;
import com.example.demo.model.*;
import com.example.demo.service.*;
import com.example.demo.util.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/")
public class AdminController {

    @Autowired
    CottageService cottageService;

    @Autowired
    FishingLessonService fishingLessonService;

    @Autowired
    BoatService boatService;

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    AdministratorService administratorService;

    @Autowired
    ClientService clientService;

    @Autowired
    ReservationService reservationService;

    @Autowired
    ProfitPercentageService profitPercentageService;

    @GetMapping("/cottages")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<OfferToList>> loadAllCottages() {
        List<OfferToList> retList = new ArrayList<>();

        List<Cottage> cottages = cottageService.findAll();
        for (Offer o : cottages) {
            retList.add(new OfferToList(o));
        }

        return new ResponseEntity<>(retList, HttpStatus.OK);
    }

    @DeleteMapping("/cottages/{cottageId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity deleteCottage(@PathVariable Integer cottageId) {
        try {
            Cottage cottage = cottageService.findById(cottageId);
            if (cottage == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            cottageService.deleteCottage(cottage);

        } catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/lessons")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<OfferToList>> loadAllFishingLessons() {
        List<OfferToList> retList = new ArrayList<>();

        List<FishingLesson> fishingLessons = fishingLessonService.findAll();
        for (Offer o : fishingLessons) {
            retList.add(new OfferToList(o));
        }

        return new ResponseEntity<>(retList, HttpStatus.OK);
    }

    @DeleteMapping("/lessons/{lessonId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity deleteFishingLesson(@PathVariable Integer lessonId) {
        try {
            FishingLesson fishingLesson = fishingLessonService.findById(lessonId);
            if (fishingLesson == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            fishingLessonService.deleteFishingLesson(fishingLesson);

        } catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/boats")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<OfferToList>> loadAllBoats() {
        List<OfferToList> retList = new ArrayList<>();

        List<Boat> boats = boatService.findAll();
        for (Offer o : boats) {
            retList.add(new OfferToList(o));
        }

        return new ResponseEntity<>(retList, HttpStatus.OK);
    }

    @DeleteMapping("/boats/{boatId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity deleteBoat(@PathVariable Integer boatId) {
        try {
            Boat boat = boatService.findById(boatId);
            if (boat == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            boatService.deleteBoat(boat);

        } catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/service_providers")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<ServiceProvidersToList>> loadAllServiceProviders() {
        List<User> users = this.userService.findAll();
        List<ServiceProvidersToList> serviceProvidersDataTableDTO = new ArrayList<>();
        for(User user : users)
        {
            if(user.isEnabled()) {
                if(user.getRoles().get(0).getName().equals("ROLE_INSTRUCTOR") ||
                        user.getRoles().get(0).getName().equals("ROLE_COTTAGE_OWNER")
                        || user.getRoles().get(0).getName().equals("ROLE_BOAT_OWNER"))
                    serviceProvidersDataTableDTO.add(new ServiceProvidersToList((ServiceProvider)user));
            }
        }

        return new ResponseEntity<>(serviceProvidersDataTableDTO, HttpStatus.OK);
    }

    @DeleteMapping("/service_providers/{providerId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity deleteServiceProvider(@PathVariable Integer providerId) {
        try {
            User serviceProvider = userService.findById(providerId);
            if (serviceProvider == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            userService.deleteUser(serviceProvider);

        } catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/clients")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<UserDataTable>> loadAllClients() {
        List<User> users = this.userService.findAll();
        List<UserDataTable> userDataTableDTO = new ArrayList<>();
        for(User user : users)
        {
            if(user.getRoles().get(0).getName().equals("ROLE_CLIENT"))
                userDataTableDTO.add(new UserDataTable(user));
        }

        return new ResponseEntity<>(userDataTableDTO, HttpStatus.OK);
    }

    @DeleteMapping("/clients/{clientId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity deleteClient(@PathVariable Integer clientId) {
        try {
            User client = userService.findById(clientId);
            if (client == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            userService.deleteUser(client);

        } catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/administrators")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    public ResponseEntity<List<UserDataTable>> loadAllAdministrators() {
        List<User> users = this.userService.findAll();
        List<UserDataTable> userDataTableDTO = new ArrayList<>();
        for(User user : users)
        {
            if(user.isEnabled()) {
                if(user.getRoles().get(0).getName().equals("ROLE_ADMIN"))
                    userDataTableDTO.add(new UserDataTable(user));
            }
        }

        return new ResponseEntity<>(userDataTableDTO, HttpStatus.OK);
    }

    @DeleteMapping("/administrators/{adminId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity deleteAdministrator(@PathVariable Integer adminId) {
        try {
            User administrator = userService.findById(adminId);
            if (administrator == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            userService.deleteUser(administrator);

        } catch (Exception e){
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/change-password/{adminId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Boolean> changePassword(@PathVariable Integer adminId, @RequestBody RequestNewPassword requestNewPassword) {

        Administrator administrator = administratorService.findById(adminId);
        boolean success = administratorService.changeAdminPassword(administrator, requestNewPassword.getNewPassword());
        if (!success)
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping("/complaints")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<ComplaintToShow>> getComplaints() {
        List<ComplaintToShow> complaintsToShow = new ArrayList<>();
        List<Client> clients = clientService.findAll();

        for(Client client : clients)
        {
            for(Complaint complaint : client.getComplaints())
            {
                ServiceProvider provider = userService.findProviderByOfferId(complaint.getOffer().getId());
                complaintsToShow.add(new ComplaintToShow(complaint, client, provider));
            }
        }

        return new ResponseEntity<>(complaintsToShow, HttpStatus.OK);
    }

    @GetMapping("/penalty-requests")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<ReportForReview>> getPenaltyRequests() {
        List<ReportForReview> reportsToShow = new ArrayList<>();
        List<ReservationReportForClient> penaltyRequests = reservationService.getPenaltyRequestsByType(ReportForClientType.BAD_USER);

        for(ReservationReportForClient penaltyRequest : penaltyRequests)
        {
            Offer offer = reservationService.findOfferForReservation(penaltyRequest.getReservation());
            reportsToShow.add(new ReportForReview(penaltyRequest, offer));
        }

        return new ResponseEntity<>(reportsToShow, HttpStatus.OK);
    }

    @GetMapping("/reservations-profit")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<ReservationProfitDTO>> getReservationsProfit() {
        List<ReservationProfitDTO> reservationProfits = new ArrayList<>();
        List<Reservation> allPassedReservations = reservationService.getPassedReservations();
        ProfitPercentage profitPercentage = profitPercentageService.findById(1);
        for(Reservation reservation : allPassedReservations)
        {
            Offer offer = reservationService.findOfferForReservation(reservation);
            reservationProfits.add(new ReservationProfitDTO(reservation, offer, profitPercentage));
        }

        return new ResponseEntity<>(reservationProfits, HttpStatus.OK);
    }

    @GetMapping("/get-profit-percentage")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Double> getProfitPercentage() {
        ProfitPercentage profitPercentage = profitPercentageService.findById(1);
        return new ResponseEntity<>(profitPercentage.getProfitPercentageValue()*100, HttpStatus.OK);
    }

    @PostMapping("/change-profit-percentage")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ProfitPercentage> changeProfitPercentage(@RequestParam("profitPercentageValue") double profitPercentageValue) {
        ProfitPercentage profitPercentage = profitPercentageService.findById(1);
        profitPercentageService.changeProfitPercentageValue(profitPercentage, profitPercentageValue);
        ProfitPercentage updatedProfitPercentage = profitPercentageService.save(profitPercentage);
        return new ResponseEntity<ProfitPercentage>(updatedProfitPercentage, HttpStatus.OK);
    }

    @GetMapping("/rating-requests")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<RatingRequestToShow>> getRatingRequests() {
        List<RatingRequestToShow> ratingRequestsToShow = new ArrayList<>();
        List<Client> clients = clientService.findAll();

        for(Client client : clients)
        {
            for(RatingRequest ratingRequest : client.getRatingRequests())
            {
                ServiceProvider provider = userService.findProviderByOfferId(ratingRequest.getOffer().getId());
                ratingRequestsToShow.add(new RatingRequestToShow(ratingRequest, client, provider));
            }
        }

        return new ResponseEntity<>(ratingRequestsToShow, HttpStatus.OK);
    }
}
