package com.example.demo.model;

import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

@SQLDelete(sql = "UPDATE USERS SET deleted = true WHERE id = ?")
@Where(clause = "is_deleted = false")

@Entity
@Table(name = "USERS")
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    protected Integer id;

    @Column(name = "email", unique = false, nullable = false)   // unique je false jer to proveravamo rucno kod
    protected String email;                                     // registracije, a moze se desiti da obrisan korisnik ponovo trazi zahtev za reg? ili ne

    @Column(name = "password", nullable = false)
    protected String password;

    @Column(name = "first_name", nullable = false)
    protected String firstName;

    @Column(name = "last_name", nullable = false)
    protected String lastName;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    protected Address address;

    @Column(name = "phone_number", nullable = false)
    protected String phoneNumber;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "rating_id", referencedColumnName = "id")
    protected Rating rating;

    @Column(name = "is_deleted", nullable = false)
    protected boolean deleted;

    @Column(name = "enabled")
    protected boolean enabled;

    @Column(name = "last_password_reset_date")
    protected Timestamp lastPasswordResetDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    protected List<Role> roles;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "deletion_request_id", referencedColumnName = "id")
    protected DeletionRequest deletionRequest;

    public User(User user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.phoneNumber = user.phoneNumber;
        this.address = user.address;
        this.rating = user.rating;
        this.deleted = user.deleted;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }


}
