package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import javax.persistence.*;

@Where(clause = "deleted = false")

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReservationReportForClient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_provider_id", referencedColumnName = "id")
    private ServiceProvider serviceProvider;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id", referencedColumnName = "id")
    private Reservation reservation;

    @Column(name = "comment", unique = false, nullable = false)
    private String comment;

    @Column(name = "report_type", unique = false, nullable = true)
    private ReportForClientType type;

    @Column(name = "deleted", nullable = false)
    protected boolean deleted;

}
