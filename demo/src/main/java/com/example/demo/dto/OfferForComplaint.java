package com.example.demo.dto;
import com.example.demo.model.Cottage;
import com.example.demo.model.Offer;
import com.example.demo.model.Reservation;
import com.example.demo.model.ServiceProvider;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfferForComplaint {

    Integer id;
    String name;
    String providerFirstName;
    String providerLastName;
    String city;
    Double rating;
    Double price;
    String img;
    String offerType;

    public OfferForComplaint(Offer o, ServiceProvider provider){
        this.id = o.getId();
        this.name = o.getName();
        this.providerFirstName = provider.getFirstName();
        this.providerLastName = provider.getLastName();
        this.city = o.getAddress().getCity();
        this.rating = o.getRating().getAverage();
        this.price = o.getPrice();
        this.img = (o.getImages().size() > 0) ? o.getImages().get(0) : null;
        this.offerType = generateOfferType(provider);
    }

    private String generateOfferType(ServiceProvider provider)
    {
        String offerType = "";
        if(provider.getRoles().get(0).getName().equals("ROLE_COTTAGE_OWNER"))
            offerType = "COTTAGE";
        else if(provider.getRoles().get(0).getName().equals("ROLE_BOAT_OWNER"))
            offerType = "BOAT";
        else
            offerType = "FISHING_LESSON";
        return offerType;
    }
}
