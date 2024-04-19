package com.example.demo.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import javax.persistence.*;

@SQLDelete(sql = "UPDATE offer SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "offer_id", referencedColumnName = "id")
    private Offer offer;

    @Column(name = "complaint_for_offer", nullable = false)
    private String complaintForOffer;

    @Column(name = "complaint_for_provider", nullable = false)
    private String complaintForProvider;

    @Column(name = "deleted", nullable = false)
    protected boolean deleted;
}
