package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Boat extends Property {

    @Column(name = "type", unique = false, nullable = false)
    private BoatType type;

    @Column(name = "length", unique = false, nullable = false)
    private double length;

    @Column(name = "engine_num", unique = true, nullable = false)
    private int engineNum;

    @Column(name = "engine_pow", unique = false, nullable = false)
    private double enginePow;

    @Column(name = "max_speed", unique = false, nullable = false)
    private double maxSpeed;

    @ElementCollection
    @Column(name = "nav_equipment")
    private Set<String> navEquipment;

    @ElementCollection
    @Column(name = "fishing_equipment")
    private Set<String> fishingEquipment;


    @Override
    public int calculatePrice() {
        // TODO
        return 0;
    }

}
