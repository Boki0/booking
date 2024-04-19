package com.example.demo.service;

import com.example.demo.dto.UserRequest;
import com.example.demo.model.Client;
import com.example.demo.model.CottageOwner;
import com.example.demo.model.User;

import java.util.List;

public interface ClientService {
    Client findById(Integer id);
    Client findByEmail(String email);
    List<Client> findAll ();
    Client save(User user);

    User updateUser(User user);
}
