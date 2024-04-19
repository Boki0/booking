package com.example.demo.dto;

import com.example.demo.model.AdditionalService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdditionalServiceDTO {

    private Integer value; // verovatno mi je samo ovaj value bitan (to je id)
    private String label;
    private double price;

    public AdditionalServiceDTO(AdditionalService ad){
        this.value = (Integer) ad.getId();
        this.price = ad.getPrice();
        this.label = ad.getName();
    }
}
