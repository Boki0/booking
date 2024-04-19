package com.example.demo.dto;

import com.example.demo.model.Discount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DiscountDTO {
    private String text;
    private LocalDate startDate;
    private LocalDate endDate;
    private int typeId;

    public DiscountDTO(Discount discount){
        this.text = "SALE - Fast Reservation";
        this.startDate = discount.getPeriod().getDateFrom();
        this.endDate = discount.getPeriod().getDateTo();
        this.typeId = 2;    // na frontu ovo znaci da je fast res
    }
}
