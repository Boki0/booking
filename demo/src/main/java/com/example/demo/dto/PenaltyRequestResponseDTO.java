package com.example.demo.dto;
import com.example.demo.model.ServiceProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PenaltyRequestResponseDTO {
    private String providerFirstName;
    private String providerLastName;
    private String providerEmail;
    private String clientFirstName;
    private String clientLastName;
    private String clientEmail;
    private String offerName;
    private String comment;

    public PenaltyRequestResponseDTO(ReportForReview reportForReview, ServiceProvider provider)
    {
        this.providerFirstName = provider.getFirstName();
        this.providerLastName = provider.getLastName();
        this.providerEmail = reportForReview.getProviderEmail();
        this.clientFirstName = reportForReview.getClientName();
        this.clientLastName = reportForReview.getClientLastName();
        this.clientEmail = reportForReview.getClientEmail();
        this.offerName = reportForReview.getOfferName();
        this.comment = reportForReview.getComment();
    }
}
