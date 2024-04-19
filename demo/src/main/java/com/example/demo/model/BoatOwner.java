package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.repository.cdi.Eager;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Entity
@NoArgsConstructor
//@AllArgsConstructor
@Getter
@Setter
public class BoatOwner extends PropertyOwner {

//    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "boat_owner_id")
//    private List<Boat> boats;

    public BoatOwner(User user) {
        super(user);
    }
}
