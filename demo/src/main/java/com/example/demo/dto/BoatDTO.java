package com.example.demo.dto;

import com.example.demo.model.Boat;
import com.example.demo.model.BoatType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoatDTO extends OfferDTO{

    private BoatType type;
    private double length;
    private int engineNum;
    private double enginePow;
    private double maxSpeed;
    private Set<String> navEquipment;
    private Set<String> fishingEquipment;

    public BoatDTO(Boat boat){
        super(boat);
        type = boat.getType();
        length = boat.getLength();
        engineNum = boat.getEngineNum();
        enginePow = boat.getEnginePow();
        maxSpeed = boat.getMaxSpeed();
        navEquipment = boat.getNavEquipment();
        fishingEquipment = boat.getFishingEquipment();
    }
}
