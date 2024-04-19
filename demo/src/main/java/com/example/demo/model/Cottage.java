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
public class Cottage extends Property {

    @Column(name = "num_of_rooms")
    private int numOfRooms;

    @Override
    public int calculatePrice() {
        return 0;
    }
}
