package com.example.demo.service;
import com.example.demo.model.ProfitPercentage;
import com.example.demo.repository.ProfitPercentageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProfitPercentageServiceImpl implements ProfitPercentageService{

    @Autowired
    ProfitPercentageRepository profitPercentageRepository;

    @Override
    public ProfitPercentage findById(Integer id) {
        return profitPercentageRepository.findById(id).orElse(null);
    }

    @Override
    public void changeProfitPercentageValue(ProfitPercentage profitPercentage, double profitPercentageValue) {
        profitPercentage.setProfitPercentageValue(profitPercentageValue);
    }

    @Override
    public ProfitPercentage save(ProfitPercentage profitPercentage) {
        return this.profitPercentageRepository.save(profitPercentage);
    }
}
