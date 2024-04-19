package com.example.demo.controller;

import com.example.demo.dto.BoatRequest;
import com.example.demo.model.Boat;
import com.example.demo.model.BoatOwner;
import com.example.demo.service.BoatOwnerService;
import com.example.demo.service.BoatService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/")
public class BoatOwnerController {

    @Autowired
    private UserService userService;

    @Autowired
    private BoatOwnerService boatOwnerService;

    @Autowired
    private BoatService boatService;


    @PostMapping("add-boat")
    @PreAuthorize("hasRole('BOAT_OWNER')")
    public ResponseEntity<Boolean> addBoat(@RequestBody BoatRequest boatRequest) {

        BoatOwner boatOwner = (BoatOwner) userService.findById(boatRequest.getOwner_id());
        if (boatOwner == null) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        Boat boat = this.boatOwnerService.addBoat(boatRequest, boatOwner);
        if (boat == null) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("edit-boat/{boatId}")
    @PreAuthorize("hasRole('BOAT_OWNER')")
    public ResponseEntity<Boat> editBoat(@PathVariable Integer boatId, @RequestBody BoatRequest boatRequest){

        Boat boat = boatService.findById(boatId);
        if (boat == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        boat = boatService.editBoat(boat, boatRequest);
        return new ResponseEntity<>(boat, HttpStatus.OK);
    }



//    @GetMapping("/myProperty/{userId}")
//    @PreAuthorize("hasRole('BOAT_OWNER')")
//    public ResponseEntity<List<Boat>> loadUsersBoats(@PathVariable Integer userId) {
//        BoatOwner u = (BoatOwner) userService.findById(userId);
//
//        if (u == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        //List<Boat> properties = boatOwnerService.findAllMyBoats(u);
//        return new ResponseEntity<>(properties, HttpStatus.OK);
//    }
}
