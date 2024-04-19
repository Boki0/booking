package com.example.demo.service;
import com.example.demo.model.ProfitPercentage;

import java.util.Optional;

public interface ProfitPercentageService {
    ProfitPercentage findById(Integer id);

    void changeProfitPercentageValue(ProfitPercentage profitPercentage, double profitPercentageValue);

    ProfitPercentage save(ProfitPercentage profitPercentage);
}
