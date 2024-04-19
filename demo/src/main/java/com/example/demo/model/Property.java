package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Entity
@NoArgsConstructor
@Getter
@Setter
public abstract class Property extends Offer {

//    @Column(name = "daily_price", unique = false, nullable = false)
//    protected double dailyPrice;

}
