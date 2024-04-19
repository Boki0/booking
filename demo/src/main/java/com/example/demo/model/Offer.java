package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SQLDelete(sql = "UPDATE offer SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public abstract class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    protected Integer id;

    @Column(name = "name", unique = false, nullable = false)
    protected String name; // title

    @Column(name = "description", unique = false, nullable = false)
    protected String description;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    protected Address address;

    @Column(name = "capacity", unique = false, nullable = false)
    protected int capacity;

    @Column(name = "regulations", unique = false, nullable = false)
    protected String regulations;

    @Column(name = "cancellation_fee", unique = false, nullable = false)
    protected double cancellationFee;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "offer_id", referencedColumnName = "id")
    protected List<Period> periodsOfOccupancy;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "offer_id", referencedColumnName = "id")
    protected Set<AdditionalService> additionalServices = new HashSet<AdditionalService>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "offer_id", referencedColumnName = "id")
    protected List<Discount> discounts;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "offer_id", referencedColumnName = "id")
    protected List<Reservation> reservations;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "rating_id", referencedColumnName = "id")
    protected Rating rating;

    @ElementCollection
    @Column(name = "images")
    protected List<String> images;



    @Column(name = "deleted")
    protected boolean deleted;

    @Column(name = "price", unique = false, nullable = false)
    protected double price;

    @ManyToMany
    @JoinTable(name = "offer_subscribed_clients", joinColumns = @JoinColumn(name = "offer_id", referencedColumnName= "id"), inverseJoinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"))
    protected Set<Client> subscribedClients;


    public abstract int calculatePrice();

}
