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
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FishingInstructor extends ServiceProvider {

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="fishing_instructor_id", referencedColumnName = "id")
    private List<FishingLesson> fishingLessons;

    @Column(name="biography")
    private String biography;

    public FishingInstructor(User user) {
        super(user);
    }
}
