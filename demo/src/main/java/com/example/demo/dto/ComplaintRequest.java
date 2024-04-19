package com.example.demo.dto;
import com.example.demo.model.Offer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintRequest {

    private Integer userId;
    private Integer reservationId;
    private String offerComplaint;
    private String providerComplaint;
}
