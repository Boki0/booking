package com.example.demo.repository;
import com.example.demo.model.RatingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRequestRepository extends JpaRepository<RatingRequest, Integer> {
}
