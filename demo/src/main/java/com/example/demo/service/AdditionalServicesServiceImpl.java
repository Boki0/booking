package com.example.demo.service;

import com.example.demo.model.AdditionalService;
import com.example.demo.repository.AdditionalServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdditionalServicesServiceImpl implements AdditionalServicesService{

    @Autowired
    private AdditionalServicesRepository additionalServicesRepository;

    @Override
    public AdditionalService findById(Integer value) {
        return additionalServicesRepository.findById(value).get();
    }
}
