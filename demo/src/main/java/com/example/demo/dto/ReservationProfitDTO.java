package com.example.demo.dto;
import com.example.demo.model.AdditionalService;
import com.example.demo.model.Offer;
import com.example.demo.model.ProfitPercentage;
import com.example.demo.model.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationProfitDTO {
    private Integer id;
    private String img;
    private String offerName;
    private String reservationEndDate;
    private Integer numOfAdditionalServices;
    private String basePrice;
    private String additionalServicesPrice;
    private String cashFlow;
    private String profitPercentage;
    private String profit;

    public ReservationProfitDTO(Reservation reservation, Offer offer, ProfitPercentage profitPercentage)
    {
        this.id = reservation.getId();
        this.img = (offer.getImages().size() > 0) ? offer.getImages().get(0) : null;
        this.offerName = offer.getName();
        this.reservationEndDate = reservation.getReservationPeriod().getDateTo().toString();
        this.numOfAdditionalServices = reservation.getChosenAdditionalServices().size();
        this.basePrice = "$" + String.valueOf(Math.round(reservation.getPrice()));
        this.additionalServicesPrice = "$" + String.valueOf(Math.round(this.countAdditionalServicesPrice(reservation.getChosenAdditionalServices())));
        this.cashFlow = "$" + String.valueOf(Math.round(this.countCashFlow(reservation)));
        this.profitPercentage = String.valueOf(profitPercentage.getProfitPercentageValue()*100.00) + "%";
        this.profit = "$" + String.valueOf(Math.round(this.countProfit(reservation, profitPercentage)));
    }

    private double countProfit(Reservation reservation, ProfitPercentage profitPercentage) {
        return (reservation.getPrice() + this.countAdditionalServicesPrice(reservation.getChosenAdditionalServices()))
                * profitPercentage.getProfitPercentageValue();
    }

    private double countCashFlow(Reservation reservation) {
        return reservation.getPrice() + countAdditionalServicesPrice(reservation.getChosenAdditionalServices());
    }

    private double countAdditionalServicesPrice(Set<AdditionalService> chosenAdditionalServices) {
        double servicesPrice = 0;
        for(AdditionalService additionalService : chosenAdditionalServices)
        {
            servicesPrice += (double) additionalService.getPrice();
        }

        return servicesPrice;
    }

}
