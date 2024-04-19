package com.example.demo.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintResponseDTO {

    private Integer complaintId;
    private String clientEmail;
    private String providerEmail;
    private String offerName;
    private String offerComplaint;
    private String providerComplaint;
    private String adminResponse;
}
