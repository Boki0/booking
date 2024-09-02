package com.example.demo;

import com.example.demo.dto.AdditionalServiceDTO;
import com.example.demo.dto.NewReservationDTO;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.AdditionalServicesService;
import com.example.demo.service.EmailService;
import com.example.demo.service.OfferService;
import com.example.demo.service.ReservationServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.stubbing.OngoingStubbing;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

public class ReservationServiceUnitTest {

    @InjectMocks
    private ReservationServiceImpl reservationService;

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private OfferRepository offerRepository;

    @Mock
    private ServiceProviderRepository serviceProviderRepo;

    @Mock
    private ReservationReportForClientRepository reportsForClientRepository;

    @Mock
    private AdditionalServicesService additionalServicesService;

    @Mock
    private OfferService offerService;

    @Mock
    private EmailService emailService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testMakeNewReservationByOwner_Success() {

        Integer clientId = 1;
        Integer offerId = 1;

        // Mock Client and Offer objects
        Client client = new Client();
        Offer offer = new Cottage();

        offer.setReservations(new ArrayList<>());
        offer.setPeriodsOfOccupancy(new ArrayList<>());

        client.setReservations(new ArrayList<>());


        NewReservationDTO newReservation = new NewReservationDTO();
        newReservation.setStartDate(LocalDate.of(2024, 9, 18));
        newReservation.setEndDate(LocalDate.of(2024, 9, 24));
        newReservation.setNumOfAttendants(5);
        newReservation.setPrice(Double.valueOf("540")); // Ensure it’s a String if that's how it's defined

        // Create AdditionalServiceDTO and add to list
        AdditionalServiceDTO serviceDTO = new AdditionalServiceDTO();
        serviceDTO.setValue(1); // Assuming 1 is a valid ID

        List<AdditionalServiceDTO> additionalServices = new ArrayList<>();
        additionalServices.add(serviceDTO);
        newReservation.setAdditionalServices(additionalServices);

        // Mock AdditionalService
        AdditionalService additionalService = new AdditionalService();
        // Set properties of additionalService as needed

        // Mocking behavior
        when(additionalServicesService.findById(1)).thenReturn(additionalService);
        when(offerService.isPeriodAvailable(newReservation.getStartDate(), newReservation.getEndDate(), offer)).thenReturn(true);

        // Mock repository save
        when(reservationRepository.save(any(Reservation.class))).thenReturn(new Reservation());

        // Act
        boolean result = reservationService.makeNewReservationByOwner(offer, client, newReservation);

        // Assert
        assertTrue(result, "created successfully.");

        // Verify interactions
        verify(additionalServicesService).findById(1);
        verify(reservationRepository).save(any(Reservation.class));
    }

    @Test
    void testMakeNewReservationByOwner_PeriodOccupied() {

        Integer clientId = 1;
        Integer offerId = 1;

        // Mock Client and Offer objects
        Client client = new Client();
        Offer offer = new Cottage();

        offer.setReservations(new ArrayList<>());
        offer.setPeriodsOfOccupancy(new ArrayList<>());

        client.setReservations(new ArrayList<>());

        // Create and populate NewReservationDTO
        NewReservationDTO newReservation = new NewReservationDTO();
        newReservation.setStartDate(LocalDate.of(2025, 9, 18));
        newReservation.setEndDate(LocalDate.of(2025, 9, 24));
        newReservation.setNumOfAttendants(3);
        newReservation.setPrice(Double.valueOf("54324")); // Ensure it’s a Double if that's how it's defined

        // Create AdditionalServiceDTO and add to list
        AdditionalServiceDTO serviceDTO = new AdditionalServiceDTO();
        serviceDTO.setValue(1); // Assuming 1 is a valid ID

        List<AdditionalServiceDTO> additionalServices = new ArrayList<>();
        additionalServices.add(serviceDTO);
        newReservation.setAdditionalServices(additionalServices);

        // Mock AdditionalService
        AdditionalService additionalService = new AdditionalService();
        // Set properties of additionalService as needed

        // Mocking behavior
        when(additionalServicesService.findById(1)).thenReturn(additionalService);
        when(offerService.isPeriodAvailable(newReservation.getStartDate(), newReservation.getEndDate(), offer)).thenReturn(false);

        // Act
        boolean result = reservationService.makeNewReservationByOwner(offer, client, newReservation);

        // Assert
        assertFalse(result, "occupied period.");



    }

}
