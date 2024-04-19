package com.example.demo.controller;

import com.example.demo.dto.CottageRequest;
import com.example.demo.model.Cottage;
import com.example.demo.model.CottageOwner;
import com.example.demo.service.CottageOwnerService;
import com.example.demo.service.CottageService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "api/")
public class CottageOwnerController {

    @Autowired
    private UserService userService;

    @Autowired
    private CottageOwnerService cottageOwnerService;

    @Autowired
    private CottageService cottageService;


    @PostMapping("add-cottage")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Boolean> addCottage(@RequestBody CottageRequest cottageRequest) {

        CottageOwner c = (CottageOwner) userService.findById(cottageRequest.getOwner_id());
        if (c == null) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        Cottage cottage = this.cottageOwnerService.addCottage(cottageRequest, c);
        if (cottage == null) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("edit-cottage/{cottageId}")
    @PreAuthorize("hasRole('COTTAGE_OWNER')")
    public ResponseEntity<Cottage> editCottage(@PathVariable Integer cottageId, @RequestBody CottageRequest cottageRequest){

        Cottage cottage = cottageService.findById(cottageId);
        if (cottage == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        cottage = cottageService.editCottage(cottage, cottageRequest);
        return new ResponseEntity<>(cottage, HttpStatus.OK);
    }
}
