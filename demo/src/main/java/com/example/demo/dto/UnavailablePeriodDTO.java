package com.example.demo.dto;

import com.example.demo.model.Period;
import com.example.demo.model.Reservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UnavailablePeriodDTO {

    private String text;
    private LocalDate startDate;
    private LocalDate endDate;
    private int typeId;

    public UnavailablePeriodDTO(Period period) {
        this.text = "Unavailable Period";
        this.startDate = period.getDateFrom();
        this.endDate = period.getDateTo();
        this.typeId = 4;    // na frontu ovo znaci da je period nedostupnosti
    }
}
