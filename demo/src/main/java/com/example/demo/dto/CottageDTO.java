package com.example.demo.dto;

import com.example.demo.model.Cottage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CottageDTO extends OfferDTO {

    private int numOfRooms;

    public CottageDTO(Cottage cottage) {
        super(cottage);
        numOfRooms = cottage.getNumOfRooms();
    }
}
