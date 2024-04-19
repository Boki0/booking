package com.example.demo.service;

import com.example.demo.dto.FishingLessonRequest;
import com.example.demo.model.Address;
import com.example.demo.model.FishingLesson;
import com.example.demo.repository.FishingLessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@Service
public class FishingLessonServiceImpl implements FishingLessonService{

    @Autowired
    FishingLessonRepository fishingLessonRepository;

    @Autowired
    OfferService offerService;

    @Override
    public FishingLesson findById(Integer id) {
        return fishingLessonRepository.findById(id).orElseGet(null);
    }

    @Override
    public FishingLesson editFishingLesson(FishingLesson fishingLesson, FishingLessonRequest fishingLessonRequest) {
        fishingLesson.setName(fishingLessonRequest.getLessonName());
        Address a = new Address();
        a.setStreet(fishingLessonRequest.getStreet());
        a.setCountry(fishingLessonRequest.getCountry());
        a.setCity(fishingLessonRequest.getCity());
        fishingLesson.setAddress(a);
        fishingLesson.setPrice(fishingLessonRequest.getPrice());
        fishingLesson.setCapacity(fishingLessonRequest.getCapacity());
        fishingLesson.setDescription(fishingLessonRequest.getDescription());
        fishingLesson.setCancellationFee(fishingLessonRequest.getFee());
        fishingLesson.setRegulations(fishingLessonRequest.getRegulations());
        fishingLesson.setImages(fishingLessonRequest.getPhotos());
        fishingLesson.setAdditionalServices(fishingLessonRequest.getAdditionalServices());
        fishingLesson.setFishingEquipment(fishingLessonRequest.getFishingGear());

        return this.fishingLessonRepository.save(fishingLesson);
    }



    @Override
    public List<FishingLesson> findAllByCityAndDateAnd(String c, String start, String end, int min, int max, int guests){
        c = c.trim();
        List<FishingLesson> fislist;
        if(c.equals(""))
            fislist =fishingLessonRepository.findAll();
        else
            fislist = fishingLessonRepository.findByAddressCityIgnoreCase(c);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        LocalDate startD = LocalDate.parse(start,formatter);

        LocalDate endD = LocalDate.parse(end,formatter) ;
        List<FishingLesson> retlist = new ArrayList<FishingLesson>();
        for(FishingLesson fis: fislist){
            int price = (int) fis.getPrice();
            if (offerService.isPeriodAvailable(startD,endD,fis ) && price>=min && price<=max && guests <= fis.getCapacity()){
                retlist.add(fis);

            }

        }
        return retlist;
    }




    @Override
    public List<FishingLesson> findAll() {
        return fishingLessonRepository.findAll();
    }

    @Override
    public Integer countFishingLessonByCity(String c) {
        return fishingLessonRepository.findByAddressCityIgnoreCase(c).size();
    }
    @Override
    public List<FishingLesson> fourOffers() {
        return fishingLessonRepository.findTop4ByOrderByRatingAverageAsc();
    }


    @Override
    public void deleteFishingLesson(FishingLesson fishingLesson) {
        fishingLesson.setDeleted(true);
        fishingLessonRepository.save(fishingLesson);
    }
}
