package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.model.*;
import com.example.demo.service.BoatService;
import com.example.demo.service.CottageService;
import com.example.demo.service.FishingLessonService;
import com.example.demo.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/")
public class OfferControler {

    @Autowired
    CottageService cottageService;

    @Autowired
    FishingLessonService fishingLessonService;

    @Autowired
    BoatService boatService;

    @Autowired
    OfferService offerService;


    @GetMapping("offer/{offerId}")
    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR', 'ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<OfferDTO> loadOffer(@PathVariable Integer offerId) {

        Offer offer = offerService.findById(offerId);
        if (offer == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(new OfferDTO(offer), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('COTTAGE_OWNER', 'ADMIN', 'SUPER_ADMIN')")
    @GetMapping("cottage/{cottageId}")
    public ResponseEntity<CottageDTO> loadCottage(@PathVariable Integer cottageId) {

        Cottage cottage = cottageService.findById(cottageId);
        if (cottage == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(new CottageDTO(cottage), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN', 'SUPER_ADMIN')")
    @GetMapping("lesson/{lessonId}")
    public ResponseEntity<FishingLessonDTO> loadLesson(@PathVariable Integer lessonId) {

        FishingLesson fishingLesson = fishingLessonService.findById(lessonId);
        if (fishingLesson == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(new FishingLessonDTO(fishingLesson), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'ADMIN', 'SUPER_ADMIN')")
    @GetMapping("boat/{boatId}")
    public ResponseEntity<BoatDTO> loadBoat(@PathVariable Integer boatId) {

        Boat boat = boatService.findById(boatId);
        if (boat == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(new BoatDTO(boat), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('BOAT_OWNER', 'COTTAGE_OWNER', 'INSTRUCTOR')")
    @PostMapping("unavailable-period/{offerId}")
    public ResponseEntity<Offer> newUnavailablePeriod(@PathVariable Integer offerId, @RequestBody PeriodDTO newPeriod) {

        Offer offer = offerService.findById(offerId);
        if (offer == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        offer = offerService.addUnavailablePeriod(offer, newPeriod);
        if (offer == null){
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(offer, HttpStatus.OK);
    }
}
