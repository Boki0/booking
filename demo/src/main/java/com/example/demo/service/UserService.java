package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.model.*;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User findById(Integer id);
    List<User> findAll ();
    User save(UserRequest userRequest);

    boolean save(Client c);
    User findByEmail(String email);
    List<Offer> findUsersOffers(ServiceProvider s);
    List<User> findDisabledUsers(boolean enabled);
    User enableUser(User user);
    User rejectRequest(User user);

    void deleteUser(User serviceProvider);

    void createDeletionRequest(User user, String requestText);

    List<User> findDeleteRequestUsers(boolean active);

    void acceptDeletionRequest(User userToBeFound);

    void rejectDeletionRequest(User userToBeFound);

    boolean isProviderReserved(ServiceProvider serviceProvider);

    List<Reservation> findUsersReservations(ServiceProvider u);

    List<Reservation> getReservationHistory(List<Reservation> usersReservations);
    List<Reservation> getFutureReservations(List<Reservation> usersReservations);

    Client findClientForReservation(Reservation r);

    List<OfferForComplaint> findOffersByClient(Client client);

    void addClientComplaint(ComplaintRequest complaintRequest, Offer offer, Client client);

    ServiceProvider findProviderByOfferId(Integer offerId);

    void removeComplaint(Complaint complaint);

    void givePenaltyPoints(Client client, int penaltiesToAdd);

    Boolean changeUserInfo(UserRequest userRequest);

    boolean changeUserPassword(User user, String newPassword);

    void addClientRating(RatingRequestDTO ratingRequestDTO, Offer offer, Client client);

    void removeRatingRequest(RatingRequest ratingRequest);

    void changeProviderRating(ServiceProvider serviceProvider, RatingRequestResponse ratingRequestResponse);

    void setRatedByClient(Reservation reservation, Client client);
}
