package com.example.demo.repository;

import com.example.demo.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CottageRepository extends JpaRepository<Cottage, Integer> {

    List<Cottage> findByAddressCityIgnoreCase(String city);
    List<Cottage> getAllByOrderByRating();
    List<Cottage> findTop4ByOrderByRatingAverageAsc();

}
