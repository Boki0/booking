package com.example.demo.service;

import com.example.demo.dto.BoatRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.model.*;
import com.example.demo.repository.BoatOwnerRepository;
import com.example.demo.repository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class BoatOwnerServiceImpl implements BoatOwnerService {

    @Autowired
    private BoatOwnerRepository boatOwnerRepository;

    @Autowired
    private BoatRepository boatRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleService roleService;

    @Override
    public BoatOwner findById(Integer id) {
        return boatOwnerRepository.findById(id).orElseGet(null);
    }

    @Override
    public BoatOwner findByEmail(String email) throws UsernameNotFoundException {
        return boatOwnerRepository.findByEmail(email);
    }

    @Override
    public List<BoatOwner> findAll() {
        return boatOwnerRepository.findAll();
    }

    @Override
    public BoatOwner save(User user, UserRequest userRequest) {
        BoatOwner b = new BoatOwner(user);

        b.setExplanationOfRegistration(userRequest.getExplanation());
        b.setRating(new Rating());
        b.setOffers(new ArrayList<>());
        b.setLoyaltyProgram(new LoyaltyProgram());

        List<Role> roles = roleService.findByName("ROLE_BOAT_OWNER");
        b.setRoles(roles);

        return this.boatOwnerRepository.save(b);
    }

    @Override
    public User updateUser(User user) {

        ((BoatOwner) user).setRating(new Rating());
//        b.setOffers(new HashSet<>());
        //b.setEnabled(true); ovo ce administrator da omoguci
        ((BoatOwner) user).setLoyaltyProgram(new LoyaltyProgram());

        List<Role> roles = roleService.findByName("ROLE_BOAT_OWNER");
        ((BoatOwner) user).setRoles(roles);

        return this.boatOwnerRepository.save(((BoatOwner) user));
    }
    public Boat addBoat(BoatRequest boatRequest, BoatOwner boatOwner) {
        Boat boat = new Boat();
        boat.setName(boatRequest.getName());
        Address a = new Address();
        a.setStreet(boatRequest.getStreet());
        a.setCountry(boatRequest.getCountry());
        a.setCity(boatRequest.getCity());
        boat.setAddress(a);
        boat.setAdditionalServices(boatRequest.getAdditionalServices());
        boat.setEngineNum(boatRequest.getEngineNum());
        boat.setType(BoatType.valueOf(boatRequest.getBoatType()));
        boat.setEnginePow(boatRequest.getEnginePow());
        boat.setFishingEquipment(boatRequest.getFishingGear());
        boat.setNavEquipment(boatRequest.getNavGear());
        boat.setLength(boatRequest.getLength());
        boat.setMaxSpeed(boatRequest.getMaxSpeed());
        boat.setPrice(boatRequest.getPrice());
        boat.setCapacity(boatRequest.getCapacity());
        boat.setDescription(boatRequest.getDescription());
        boat.setCancellationFee(boatRequest.getFee());
        boat.setRegulations(boatRequest.getRegulations());
        boat.setImages(boatRequest.getPhotos());

        boat.setDeleted(false);
        boat.setRating(new Rating());
        boat.setPeriodsOfOccupancy(new ArrayList<Period>());
        boat.setDiscounts(new ArrayList<>());
        boat.setReservations(new ArrayList<>());
        boat.setSubscribedClients(new HashSet<>());

        boatOwner.getOffers().add(boat);

        return this.boatRepository.save(boat);
    }

//    @Override
//    public List<Boat> findAllMyBoats(BoatOwner u) {
//        return u.getBoats();
//    }
}
