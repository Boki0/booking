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
@Setter
@Getter
public abstract class ServiceProvider extends User {

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "loyalty_id", referencedColumnName = "id")
    protected LoyaltyProgram loyaltyProgram;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "offer_owner_id")
    private List<Offer> offers;

    @Column(name = "explanation_of_registration")
    private String explanationOfRegistration;

    public ServiceProvider(User user) {
        super(user);
    }
}
