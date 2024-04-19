package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@Getter
@Setter
public class ProfitPercentage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "profit_percentage_value", unique = false, nullable = false)
    private double profitPercentageValue;

    public ProfitPercentage(double newProfitPercentageValue) {
        this.profitPercentageValue = newProfitPercentageValue;
    }

    public ProfitPercentage() {

    }
}
