package com.example.demo.service;

import com.example.demo.model.Discount;
import com.example.demo.repository.DiscountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiscountServiceImpl implements DiscountService{
    @Autowired
    DiscountRepository discountRepository;

    @Override
    public Discount findById(int id){
        return  discountRepository.findById(id).orElse(null);

    }

    @Override
    public  void delete(Discount dis){
        discountRepository.delete(dis);
    }
}
