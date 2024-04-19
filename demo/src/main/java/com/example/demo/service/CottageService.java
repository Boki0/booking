package com.example.demo.service;

import com.example.demo.dto.CottageRequest;
import com.example.demo.model.Cottage;

import java.util.List;

public interface CottageService {

    public Cottage findById(Integer id);
    public Integer countCottagesByCity(String c);
    public List<Cottage> findAll();

    public List<Cottage> findAllByCityAndDateAnd(String c, String start, String end,int min,int max,int guests, int rooms);

    public List<Cottage> findAllByCity(String c);
    Cottage editCottage(Cottage cottage, CottageRequest cottageRequest);
    public List<Cottage> fourOffers();

    void deleteCottage(Cottage cottage);
}
