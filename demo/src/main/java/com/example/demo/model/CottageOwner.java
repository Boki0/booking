package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
public class CottageOwner extends PropertyOwner{

//    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name="cottage_owner_id")
//    private List<Cottage> cottages;

    public CottageOwner(User user) {
        super(user);
    }
}
