package com.example.demo.service;

import com.example.demo.model.Discount;

public interface DiscountService {

    Discount findById(int id);

    void delete(Discount dis);
}
