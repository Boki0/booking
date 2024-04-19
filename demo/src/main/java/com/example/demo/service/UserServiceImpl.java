package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BoatOwnerService boatOwnerService;
    @Autowired
    private CottageOwnerService cottageOwnerService;
    @Autowired
    private ClientService clientService;
    @Autowired
    private FishingInstructorService fishingInstructorService;
    @Autowired
    private AdministratorService administratorService;

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private RatingRequestRepository ratingRequestRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<Offer> findUsersOffers(ServiceProvider owner) {
        return owner.getOffers();
    }




    @Override
    public List<User> findDisabledUsers(boolean enabled) {
        return userRepository.findByEnabled(enabled);
    }

    @Override
    public User enableUser(User user) {
        user.setEnabled(true);
        return this.userRepository.save(user);
    }

    @Override
    public User rejectRequest(User user) {
        user.setDeleted(true);
        return this.userRepository.save(user);
    }

    @Override
    public void deleteUser(User serviceProvider) {
        serviceProvider.setDeleted(true);
        userRepository.save(serviceProvider);
    }

    @Override
    public void createDeletionRequest(User user, String requestText) {
        user.setDeletionRequest(new DeletionRequest(user.getId(), requestText));
        userRepository.save(user);
    }

    @Override
    public List<User> findDeleteRequestUsers(boolean active) {
        return userRepository.findByDeletionRequestActive(active);
    }

    @Override
    public void acceptDeletionRequest(User userToBeFound) {
        userToBeFound.setDeleted(true);
        userToBeFound.getDeletionRequest().setActive(false);
        userToBeFound.getDeletionRequest().setRequestText("");
        this.userRepository.save(userToBeFound);
    }

    @Override
    public void rejectDeletionRequest(User userToBeFound) {
        userToBeFound.getDeletionRequest().setActive(false);
        userToBeFound.getDeletionRequest().setRequestText("");
        this.userRepository.save(userToBeFound);
    }

    @Override
    public boolean isProviderReserved(ServiceProvider serviceProvider) {

        boolean isReserved = false;

        for(Offer offer : serviceProvider.getOffers())
        {
            for (Reservation reservation : offer.getReservations())
            {
                if (reservation.getReservationPeriod().getDateTo().isAfter(LocalDate.now())){
                    isReserved = true;
                }
            }
        }
        return isReserved;
    }

    @Override
    public List<Reservation> findUsersReservations(ServiceProvider serviceProvider) {
        List<Reservation> reservations = new ArrayList<>();

        for(Offer offer : serviceProvider.getOffers()){
            for(Reservation res : offer.getReservations()){
                reservations.add(res);
            }
        }
        return reservations;
    }

    @Override
    public List<Reservation> getReservationHistory(List<Reservation> usersReservations) {
        List<Reservation> retList = new ArrayList<>();

        for(Reservation reservation : usersReservations){
            if (reservation.getReservationPeriod().getDateFrom().isBefore(LocalDate.now())) // ovde se smestaju i trenutne rez
                retList.add(reservation);
        }
        return retList;
    }

    @Override
    public List<Reservation> getFutureReservations(List<Reservation> usersReservations) {
        List<Reservation> retList = new ArrayList<>();

        for(Reservation reservation : usersReservations){
            if (reservation.getReservationPeriod().getDateTo().isAfter(LocalDate.now()))  // i ovde su i trenutne rez
                retList.add(reservation);
        }
        return retList;
    }

    @Override
    public Client findClientForReservation(Reservation r) {
        for(Client client : clientRepository.findAll()){
            for(Reservation res : client.getReservations()){
                if (res.getId() == r.getId()) return client;
            }
        }
        return null;
    }

    @Override
    public List<OfferForComplaint> findOffersByClient(Client client) {
        List<OfferForComplaint> offersToPresent = new ArrayList<>();

        for(ServiceProvider provider : serviceProviderRepository.findAll())
        {
            for (Offer offer : provider.getOffers())
            {
                for(Reservation reservation : offer.getReservations())
                {
                    for (Client subscriber : offer.getSubscribedClients())
                    {
                        if (client.getId().equals(subscriber.getId()) && reservation.getReservationPeriod().getDateTo().isBefore(LocalDate.now()))
                        {
                            OfferForComplaint offerToPresent = new OfferForComplaint(offer, provider);
                            offersToPresent.add(offerToPresent);
                        }
                    }
                }
            }
        }

        return offersToPresent;
    }

    @Override
    public void addClientComplaint(ComplaintRequest complaintRequest, Offer offer, Client client) {
        Complaint complaint = new Complaint();
        complaint.setOffer(offer);
        complaint.setComplaintForOffer(complaintRequest.getOfferComplaint());
        complaint.setComplaintForProvider(complaintRequest.getProviderComplaint());
        this.complaintRepository.save(complaint);
        client.getComplaints().add(complaint);
        this.userRepository.save(client);
    }

    @Override
    public ServiceProvider findProviderByOfferId(Integer offerId) {
        List<ServiceProvider> allProviders = this.serviceProviderRepository.findAll();
        ServiceProvider wantedProvider = null;
        for(ServiceProvider provider : allProviders)
        {
            for (Offer offer : provider.getOffers())
            {
                if (offer.getId().equals(offerId)) {
                    wantedProvider = provider;
                    break;
                }
            }
        }
        return wantedProvider;
    }

    @Override
    public void removeComplaint(Complaint complaint) {
        complaint.setDeleted(true);
        this.complaintRepository.save(complaint);
    }

    @Override
    public void givePenaltyPoints(Client client, int penaltiesToAdd) {
        client.setNumOfPenalties(client.getNumOfPenalties() + penaltiesToAdd);
        this.userRepository.save(client);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with email '%s'.", email));
        } else {
            return user;
        }
    }

    public User findById(Integer id) throws AccessDeniedException {
        return userRepository.findById(id).orElseGet(null);
    }

    public List<User> findAll() throws AccessDeniedException {
        return userRepository.findAll();
    }

    public User save(UserRequest userRequest) {
        User u = new User();
        u.setEmail(userRequest.getEmail());

        // pre nego sto postavimo lozinku u atribut hesiramo je kako bi se u bazi nalazila hesirana lozinka
        // treba voditi racuna da se koristi isi password encoder bean koji je postavljen u AUthenticationManager-u kako bi koristili isti algoritam
        u.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        u.setFirstName(userRequest.getFirstName());
        u.setLastName(userRequest.getLastName());
        u.setPhoneNumber(userRequest.getPhoneNumber());
        Address a = new Address();
        a.setStreet(userRequest.getStreet());
        a.setCity(userRequest.getCity());
        a.setCountry(userRequest.getCountry());
        u.setAddress(a);
        u.setDeleted(false);
        u.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));

        switch (userRequest.getType()) {
            case "boat_owners":
                return boatOwnerService.save(u, userRequest);
            case "cottage_owners":
                return cottageOwnerService.save(u, userRequest);
            case "clients":
                return clientService.save(u);
            case "instructors":
                return fishingInstructorService.save(u, userRequest);
            case "administrators":
                return administratorService.save(u);
            default:
                return null;
        }
    }

    @Override
    public Boolean changeUserInfo(UserRequest userRequest){
        User c = userRepository.findByEmail(userRequest.getEmail());
        c.setFirstName(userRequest.getFirstName());
        c.setLastName(userRequest.getLastName());
        c.setPhoneNumber(userRequest.getPhoneNumber());
        Address a = new Address();
        a.setCity(userRequest.getCity());
        a.setCountry(userRequest.getCountry());
        a.setStreet(userRequest.getStreet());
        c.setAddress(a);

        userRepository.save(c);
        return true;




    }
    @Override
    public boolean save(Client c){
        userRepository.save(c);
        return true;
    }

    @Override
    public boolean changeUserPassword(User user, String newPassword) {
        boolean success = !passwordEncoder.matches(newPassword, user.getPassword());
        if(success)
        {
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));
            this.userRepository.save(user);
        }

        return success;
    }

    @Override
    public void addClientRating(RatingRequestDTO ratingRequestDTO, Offer offer, Client client) {
        RatingRequest ratingRequest = new RatingRequest();
        ratingRequest.setOffer(offer);
        ratingRequest.setRatingValue(ratingRequestDTO.getRatingOfUser());
        ratingRequest.setComment(ratingRequestDTO.getCommentOfUser());
        this.ratingRequestRepository.save(ratingRequest);
        client.getRatingRequests().add(ratingRequest);
        this.userRepository.save(client);
    }

    @Override
    public void removeRatingRequest(RatingRequest ratingRequest) {
        ratingRequest.setDeleted(true);
        this.ratingRequestRepository.save(ratingRequest);
    }

    @Override
    public void changeProviderRating(ServiceProvider serviceProvider, RatingRequestResponse ratingRequestResponse) {
        serviceProvider.getRating().setNewRatingAverage(ratingRequestResponse.getRatingValue());
        serviceProviderRepository.save(serviceProvider);
    }

    @Override
    public void setRatedByClient(Reservation reservation, Client client) {
        reservation.setHasClientRated(true);
        reservationRepository.save(reservation);
    }


}
