package com.example.demo.service;
import com.example.demo.model.Administrator;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.AdministratorRepository;
import com.example.demo.repository.BoatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdministratorServiceImpl implements AdministratorService{

    @Autowired
    private RoleService roleService;

    @Autowired
    private AdministratorRepository administratorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User save(User u) {
        Administrator administrator = new Administrator(u);
        List<Role> roles = roleService.findByName("ROLE_ADMIN");
        administrator.setRoles(roles);
        administrator.setEnabled(true);

        return this.administratorRepository.save(administrator);
    }

    @Override
    public Administrator findById(Integer adminId) {
        return administratorRepository.findById(adminId).orElseGet(null);
    }

    @Override
    public boolean changeAdminPassword(Administrator administrator, String newPassword) {
        boolean success = !passwordEncoder.matches(newPassword, administrator.getPassword());
        if(success)
        {
            administrator.setPassword(passwordEncoder.encode(newPassword));
            administrator.setLastPasswordResetDate(Timestamp.valueOf(LocalDateTime.now()));
            administrator.setPasswordChanged(true);
            this.administratorRepository.save(administrator);
        }

        return success;
    }
}
