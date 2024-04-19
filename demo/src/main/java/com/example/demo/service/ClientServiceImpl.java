package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleService roleService;

    @Autowired
    private EmailService emailService;

    @Override
    public Client findById(Integer id) {
        return clientRepository.findById(id).orElseGet(null);
    }

    @Override
    public Client findByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    @Override
    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    @Override
    public Client save(User user) {
        Client c = new Client(user);
        c.setRating(new Rating());
        c.setLoyaltyProgram(new LoyaltyProgram());
        c.setReservations(new ArrayList<>());
        List<Role> roles = roleService.findByName("ROLE_CLIENT");
        c.setRoles(roles);
        c.setNumOfPenalties(0);
        c.setEnabled(false);
        String s = this.generateRandomPassword(15);
        c.setRegToken(s);
        emailService.sendmailRegistrationClient(c);

        return this.clientRepository.save(c);
    }


    public String generateRandomPassword(int len) {
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk"
                +"lmnopqrstuvwxyz";
        Random rnd = new Random();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }


    @Override
    public User updateUser(User user) {
        return null;    //TODO
    }
}
