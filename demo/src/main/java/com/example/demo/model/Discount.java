package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer"})

public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "period_id", referencedColumnName = "id")
    private Period period;

    @Column(name = "price", unique = false, nullable = false)
    private double price;

    @Column(name = "is_acitve", unique = false, nullable = false)
    private boolean isActive;

    @ManyToMany
    @JoinTable(name = "discount_additional_services", joinColumns = @JoinColumn(name = "discount_id", referencedColumnName= "id"), inverseJoinColumns = @JoinColumn(name = "additional_service_id", referencedColumnName = "id"))
    private Set<AdditionalService> chosenAdditionalServices = new HashSet<AdditionalService>();

}
