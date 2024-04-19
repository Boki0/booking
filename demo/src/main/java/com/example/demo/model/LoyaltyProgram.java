package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@Getter
@Setter
public class LoyaltyProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "points", unique = false, nullable = false)
    private int points;

    @Column(name = "rank", unique = false, nullable = false)
    private LoyaltyRank rank;

    public LoyaltyProgram(){
        points = 0;
        rank = LoyaltyRank.REGULAR;
    }

}
