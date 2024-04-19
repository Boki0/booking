package com.example.demo.service;
import com.example.demo.model.Complaint;
import com.example.demo.model.RatingRequest;

public interface RatingRequestService {
    RatingRequest findById(Integer id);
}
