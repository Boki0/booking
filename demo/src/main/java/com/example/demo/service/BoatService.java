package com.example.demo.service;

import com.example.demo.dto.BoatRequest;
import com.example.demo.model.Boat;

import java.util.List;

public interface BoatService {

    Boat findById(Integer id);

    List<Boat> findAll();

    List<Boat> fourOffersBoat();

    public List<Boat> findAllByCityAndDateAnd(String c, String start, String end, int min, int max, int guests);

    void deleteBoat(Boat boat);

    public Integer countBoatsByCity(String c);
    Boat editBoat(Boat boat, BoatRequest boatRequest);
}
