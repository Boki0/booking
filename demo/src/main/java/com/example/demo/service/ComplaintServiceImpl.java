package com.example.demo.service;
import com.example.demo.dto.ComplaintToShow;
import com.example.demo.model.Complaint;
import com.example.demo.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService{

    @Autowired
    private ComplaintRepository complaintRepository;

    public Complaint findById(Integer id) throws AccessDeniedException {
        return complaintRepository.findById(id).orElseGet(null);
    }

    @Override
    public List<Complaint> findActiveComplaints(boolean active) {
        return complaintRepository.findByDeletedNot(active);
    }
}
