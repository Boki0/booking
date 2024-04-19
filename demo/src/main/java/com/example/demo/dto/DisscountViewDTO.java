package com.example.demo.dto;

import com.example.demo.model.AdditionalService;
import com.example.demo.model.Discount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DisscountViewDTO {


    private String time;
    private int id;
    private double price;
    private String addServ;


    public DisscountViewDTO(Discount discount){
        this.id = discount.getId();
        this.time = discount.getPeriod().toString();
        this.price = discount.getPrice();
        this.addServ = "";
        for(AdditionalService ad : discount.getChosenAdditionalServices())
            this.addServ = this.addServ+ "," +ad.getName();


    }
}
