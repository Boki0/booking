package com.example.demo.repository;

import com.example.demo.model.Boat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoatRepository extends JpaRepository<Boat, Integer> {
    List<Boat> findByAddressCityIgnoreCase(String city);


    List<Boat> findTop4ByOrderByRatingAverageAsc();
}
