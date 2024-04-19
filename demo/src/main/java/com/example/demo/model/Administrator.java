package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import java.util.Collection;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Administrator extends User{

    @Column(name="password_changed")
    private boolean passwordChanged;

    public Administrator(User user) {
        super(user);
        this.passwordChanged = false;
    }
}
