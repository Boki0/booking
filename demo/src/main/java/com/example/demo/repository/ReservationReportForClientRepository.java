package com.example.demo.repository;

import com.example.demo.model.ReportForClientType;
import com.example.demo.model.ReservationReportForClient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationReportForClientRepository extends JpaRepository<ReservationReportForClient, Integer> {
}
