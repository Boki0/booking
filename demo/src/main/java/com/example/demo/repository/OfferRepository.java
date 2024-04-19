package com.example.demo.repository;

import com.example.demo.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface OfferRepository  extends JpaRepository<Offer, Integer> {

    @Query(value = "select * from offer o where o.offer_owner_id =?1", nativeQuery = true)
    Set<Offer> findOffersOfUser(Integer ownerId);


}
