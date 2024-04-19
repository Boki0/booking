package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FishingLesson extends Offer {

//    @Column(name = "lesson_price", unique = false, nullable = false)
//    protected int lessonPrice;

    @ElementCollection
    @Column(name="fishing_equipment")
    protected Set<String> fishingEquipment;

    @Override
    public int calculatePrice() {
        return 0; // TODO
    }

}
