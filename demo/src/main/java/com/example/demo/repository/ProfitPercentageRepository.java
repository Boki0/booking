package com.example.demo.repository;
import com.example.demo.model.Offer;
import com.example.demo.model.ProfitPercentage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfitPercentageRepository extends JpaRepository<ProfitPercentage, Integer> {

}
