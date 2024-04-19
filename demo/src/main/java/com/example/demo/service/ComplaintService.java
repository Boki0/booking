package com.example.demo.service;
import com.example.demo.model.Complaint;
import java.util.List;


public interface ComplaintService {
    Complaint findById(Integer id);
    List<Complaint> findActiveComplaints(boolean active);
}
