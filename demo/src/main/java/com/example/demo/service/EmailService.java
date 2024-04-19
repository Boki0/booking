package com.example.demo.service;

import com.example.demo.dto.ComplaintResponseDTO;
import com.example.demo.dto.NewDiscountDTO;
import com.example.demo.dto.PenaltyRequestResponseDTO;
import com.example.demo.dto.RatingRequestResponse;
import com.example.demo.model.Client;
import com.example.demo.model.Offer;
import com.example.demo.model.Reservation;
import com.example.demo.model.User;

import javax.mail.MessagingException;
import java.io.IOException;

public interface EmailService {
    void sendmailRegistration(User user, boolean accepted, String explanation) throws InterruptedException, MessagingException, IOException;

    void sendEmailToSubscribedClients(Offer offer, NewDiscountDTO newDiscount);

    void sendmailRegistrationClient(Client client);
    void sendmailDeletion(User user, boolean accepted, String requestText);

    void sendComplaintResponse(ComplaintResponseDTO complaintResponseDTO);
    void sendReservationConfirmationToClient(Client client, Offer offer, Reservation reservation);

    void sendPenaltyRequestEmail(PenaltyRequestResponseDTO penaltyRequestResponseDTO, boolean accepted);

    void sendRatingRequestResponse(RatingRequestResponse ratingRequestResponse, boolean accepted);
}
