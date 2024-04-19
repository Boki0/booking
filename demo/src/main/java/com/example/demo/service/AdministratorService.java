package com.example.demo.service;

import com.example.demo.model.Administrator;
import com.example.demo.model.User;

public interface AdministratorService {
    User save(User u);

    Administrator findById(Integer adminId);

    boolean changeAdminPassword(Administrator administrator, String newPassword);
}
