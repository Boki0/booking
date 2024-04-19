package com.example.demo.dto;
import com.example.demo.model.Offer;
import com.example.demo.model.Reservation;
import com.example.demo.model.ServiceProvider;
import com.example.demo.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceProvidersToList {

    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private String country;
    private String city;
    private String street;
    private String phoneNumber;
    private String type;
    private String status;

    public ServiceProvidersToList(ServiceProvider serviceProvider) {
        this.id = serviceProvider.getId();
        this.email = serviceProvider.getEmail();
        this.firstName = serviceProvider.getFirstName();
        this.lastName = serviceProvider.getLastName();
        this.country = serviceProvider.getAddress().getCountry();
        this.city = serviceProvider.getAddress().getCity();
        this.street = serviceProvider.getAddress().getStreet();
        this.phoneNumber = serviceProvider.getPhoneNumber();
        this.type = generateType(String.valueOf(serviceProvider.getClass()));
        this.status = setStatus(serviceProvider.getOffers());
    }

    private String setStatus(List<Offer> offers) {
        String retString = "no_reservations";

        for (Offer offer : offers)
        {
            for (Reservation reservation: offer.getReservations()) {
                if (reservation.getReservationPeriod().getDateTo().isAfter(LocalDate.now())){
                    retString = "reserved";
                    break;
                }
            }
        }

        return retString;
    }

    public String generateType(String rawType)  //formira ispis za tabelu
    {
        String retVal = "";
        String [] rawTypeSegments = rawType.split("\\.");
        retVal = rawTypeSegments[4];

        switch (retVal) {
            case "SuperAdmin":
                retVal = "Super Admin";
                break;
            case "Administrator":
                retVal = "Administrator";
                break;
            case "BoatOwner":
                retVal = "Boat Owner";
                break;
            case "FishingInstructor":
                retVal = "Fishing Instructor";
                break;
            case "CottageOwner":
                retVal = "Cottage Owner";
                break;
            case "Client":
                retVal = "Client";
                break;
        }

        return retVal;
    }
}
