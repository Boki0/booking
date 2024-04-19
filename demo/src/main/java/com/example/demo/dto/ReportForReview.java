package com.example.demo.dto;
import com.example.demo.model.Offer;
import com.example.demo.model.ReservationReportForClient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportForReview {
    private Integer id;
    private Integer clientId;
    private String clientEmail;
    private String clientName;
    private String clientLastName;
    private Integer providerId;
    private String providerEmail;
    private String img;
    private String offerName;
    private String comment;

    public ReportForReview(ReservationReportForClient penaltyRequest, Offer offer) {
        this.id = penaltyRequest.getId();
        this.clientId = penaltyRequest.getClient().getId();
        this.clientEmail = penaltyRequest.getClient().getEmail();
        this.clientName = penaltyRequest.getClient().getFirstName();
        this.clientLastName = penaltyRequest.getClient().getLastName();
        this.providerId = penaltyRequest.getServiceProvider().getId();
        this.providerEmail = penaltyRequest.getServiceProvider().getEmail();
        this.img = (offer.getImages().size() > 0) ? offer.getImages().get(0) : null;
        this.offerName = offer.getName();
        this.comment = penaltyRequest.getComment();
    }
}
