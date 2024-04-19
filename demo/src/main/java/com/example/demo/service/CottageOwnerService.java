package com.example.demo.service;

import com.example.demo.dto.CottageRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.model.BoatOwner;
import com.example.demo.model.Cottage;
import com.example.demo.model.CottageOwner;
import com.example.demo.model.User;

import java.util.List;

public interface CottageOwnerService {
    CottageOwner findById(Integer id);
    CottageOwner findByEmail(String email);
    List<CottageOwner> findAll ();
    CottageOwner save(User user, UserRequest userRequest);

    Cottage addCottage(CottageRequest cottageRequest, CottageOwner c);

    User updateUser(User user);
}
