package com.example.demo.dto;
import com.example.demo.model.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RatingRequestToShow {

    private Integer id;
    private String clientEmail;
    private Integer offerId;
    private String offerName;
    private String img;
    private String providerEmail;
    private double ratingValue;
    private String commentOfUser;

    public RatingRequestToShow(RatingRequest ratingRequest, Client client, ServiceProvider provider)
    {
        this.id = ratingRequest.getId();
        this.clientEmail = client.getEmail();
        this.offerId = ratingRequest.getOffer().getId();
        this.offerName = ratingRequest.getOffer().getName();
        this.img = (ratingRequest.getOffer().getImages().size() > 0) ? ratingRequest.getOffer().getImages().get(0) : null;
        this.providerEmail = provider.getEmail();
        this.ratingValue = ratingRequest.getRatingValue();
        this.commentOfUser = ratingRequest.getComment();
    }
}
