package com.example.demo.dto;
import com.example.demo.model.Client;
import com.example.demo.model.Complaint;
import com.example.demo.model.Offer;
import com.example.demo.model.ServiceProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintToShow {

    private Integer id;
    private String clientEmail;
    private Integer offerId;
    private String offerName;
    private String img;
    private String providerEmail;
    private String offerComplaint;
    private String providerComplaint;

    public ComplaintToShow(Complaint complaint, Client client, ServiceProvider provider)
    {
        this.id = complaint.getId();
        this.clientEmail = client.getEmail();
        this.offerId = complaint.getOffer().getId();
        this.offerName = complaint.getOffer().getName();
        this.img = (complaint.getOffer().getImages().size() > 0) ? complaint.getOffer().getImages().get(0) : null;
        this.providerEmail = provider.getEmail();
        this.offerComplaint = complaint.getComplaintForOffer();
        this.providerComplaint = complaint.getComplaintForProvider();
    }
}
