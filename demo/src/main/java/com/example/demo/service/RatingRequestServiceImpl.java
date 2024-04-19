package com.example.demo.service;
import com.example.demo.model.RatingRequest;
import com.example.demo.repository.RatingRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingRequestServiceImpl implements RatingRequestService{

    @Autowired
    private RatingRequestRepository ratingRequestRepository;

    @Override
    public RatingRequest findById(Integer id) {
        return ratingRequestRepository.findById(id).orElseGet(null);
    }
}
