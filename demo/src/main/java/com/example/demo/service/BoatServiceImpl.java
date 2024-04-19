package com.example.demo.service;

import com.example.demo.dto.BoatRequest;
import com.example.demo.model.Address;
import com.example.demo.model.Boat;
import com.example.demo.repository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@Service
public class BoatServiceImpl implements BoatService{

    @Autowired
    BoatRepository boatRepository;

    @Autowired
    OfferService offerService;

    @Override
    public Boat findById(Integer id) {
        return boatRepository.findById(id).orElseGet(null);
    }

    @Override
    public List<Boat> findAll() {
        return boatRepository.findAll();
    }

    @Override
    public Integer countBoatsByCity(String c) {
        return boatRepository.findByAddressCityIgnoreCase(c).size();
    }


    @Override
    public List<Boat> findAllByCityAndDateAnd(String c, String start, String end, int min, int max, int guests){
        c = c.trim();
        List<Boat> boatList;
        if(c.equals(""))
            boatList =boatRepository.findAll();
        else
            boatList = boatRepository.findByAddressCityIgnoreCase(c);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        LocalDate startD = LocalDate.parse(start,formatter);

        LocalDate endD = LocalDate.parse(end,formatter) ;
        List<Boat> retlist = new ArrayList<Boat>();
        for(Boat boat: boatList){
            int price = (int) boat.getPrice();
            if (offerService.isPeriodAvailable(startD,endD,boat ) && price>=min && price<=max && guests <= boat.getCapacity()){
                retlist.add(boat);

            }

        }
        return retlist;
    }

    @Override
    public List<Boat> fourOffersBoat() {
      return boatRepository.findTop4ByOrderByRatingAverageAsc();

    }
    @Override
    public void deleteBoat(Boat boat) {
        boat.setDeleted(true);
        boatRepository.save(boat);
    }

    @Override
    public Boat editBoat(Boat boat, BoatRequest boatRequest) {
        boat.setName(boatRequest.getName());
        Address a = new Address();
        a.setStreet(boatRequest.getStreet());
        a.setCountry(boatRequest.getCountry());
        a.setCity(boatRequest.getCity());
        boat.setAddress(a);
        boat.setPrice(boatRequest.getPrice());
        boat.setCapacity(boatRequest.getCapacity());
        boat.setDescription(boatRequest.getDescription());
        boat.setCancellationFee(boatRequest.getFee());
        boat.setRegulations(boatRequest.getRegulations());
        boat.setImages(boatRequest.getPhotos());
        boat.setAdditionalServices(boatRequest.getAdditionalServices());
        boat.setEngineNum(boatRequest.getEngineNum());
        boat.setEnginePow(boatRequest.getEnginePow());
        boat.setFishingEquipment(boatRequest.getFishingGear());
        boat.setLength(boatRequest.getLength());
        boat.setMaxSpeed(boatRequest.getMaxSpeed());
        boat.setNavEquipment(boatRequest.getNavGear());

        return this.boatRepository.save(boat);
    }
}
