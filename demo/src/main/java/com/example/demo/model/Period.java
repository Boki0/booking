package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Period {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "date_from", unique = false, nullable = false)
    private LocalDate dateFrom;

    @Column(name = "date_to", unique = false, nullable = false)
    private LocalDate dateTo;

    public Period(LocalDate from, LocalDate to){
        dateFrom = from;
        dateTo = to;
    }

    @Override
    public String toString() {
        return dateFrom.toString() + " - " + dateTo.toString();
    }

    public boolean isBetween(LocalDate startDate, LocalDate endDate) {

        if ((startDate.isAfter(dateFrom) || startDate.isEqual(dateFrom)) && startDate.isBefore(dateTo))
            return true;
        if (endDate.isAfter(dateFrom)  && (endDate.isBefore(dateTo) || endDate.isEqual(dateTo)))
            return true;
        if (startDate.isBefore(dateFrom) && ((endDate.isAfter(dateTo) || endDate.isEqual(dateTo))))
            return true;

        return false;
    }
}
