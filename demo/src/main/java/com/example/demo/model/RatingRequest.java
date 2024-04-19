package com.example.demo.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Where(clause = "deleted = false")

@Entity
@AllArgsConstructor
@Getter
@Setter
public class RatingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "offer_id", referencedColumnName = "id")
    private Offer offer;

    @Column(name = "rating_value", nullable = false)
    private double ratingValue;

    @Column(name = "comment", nullable = false)
    private String comment;

    @Column(name = "deleted", nullable = false)
    protected boolean deleted;

    public RatingRequest() {

    }
}
