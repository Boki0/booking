package com.example.demo.service;

import com.example.demo.dto.FishingLessonRequest;
import com.example.demo.dto.UserRequest;
import com.example.demo.model.*;
import com.example.demo.repository.FishingInstructorRepository;
import com.example.demo.repository.FishingLessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
@Service
public class FishingInstructorServiceImpl implements FishingInstructorService{

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private FishingInstructorRepository fishingInstructorRepository;
    @Autowired
    private RoleService roleService;
    @Autowired
    private FishingLessonRepository fishingLessonRepository;

    @Override
    public FishingInstructor findById(Integer id) {
        return fishingInstructorRepository.findById(id).orElseGet(null);
    }

    @Override
    public FishingInstructor findByEmail(String email) {
        return fishingInstructorRepository.findByEmail(email);
    }

    @Override
    public List<FishingInstructor> findAll() {
        return fishingInstructorRepository.findAll();
    }

    @Override
    public FishingInstructor save(User user, UserRequest userRequest) {
        FishingInstructor f = new FishingInstructor(user);

        f.setExplanationOfRegistration(userRequest.getExplanation());
        f.setRating(new Rating());
        f.setLoyaltyProgram(new LoyaltyProgram());
        f.setFishingLessons(new ArrayList<>());
        f.setBiography("");
        List<Role> roles = roleService.findByName("ROLE_INSTRUCTOR");
        f.setRoles(roles);

        return this.fishingInstructorRepository.save(f);
    }

    @Override
    public FishingInstructor updateUser(User user) {

        ((FishingInstructor) user).setRating(new Rating());
        ((FishingInstructor) user).setLoyaltyProgram(new LoyaltyProgram());
        ((FishingInstructor) user).setFishingLessons(new ArrayList<>());
        ((FishingInstructor) user).setBiography("");
        List<Role> roles = roleService.findByName("ROLE_INSTRUCTOR");
        ((FishingInstructor) user).setRoles(roles);

        return this.fishingInstructorRepository.save(((FishingInstructor) user));
    }

    @Override
    public FishingLesson addFishingLesson(FishingLessonRequest fishingLessonRequest, FishingInstructor fI) {
        FishingLesson fishingLesson = new FishingLesson();
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
        fishingLesson.setFishingEquipment(fishingLessonRequest.getFishingGear());
        fishingLesson.setAdditionalServices(fishingLessonRequest.getAdditionalServices());

        fishingLesson.setDeleted(false);
        fishingLesson.setReservations(new ArrayList<>());
        fishingLesson.setDiscounts(new ArrayList<>());
        fishingLesson.setPeriodsOfOccupancy(new ArrayList<>());
        fishingLesson.setRating(new Rating());
        fishingLesson.setSubscribedClients(new HashSet<>());

        fI.getOffers().add(fishingLesson);

        return this.fishingLessonRepository.save(fishingLesson);
    }
}
