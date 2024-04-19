package com.example.demo.dto;
import com.example.demo.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//Ovaj DTO se koristi za prikaz podataka u zahtevu za brisanje korisnika. Ovaj prikaz vidi admin

public class DeleteUserDataTable {

    private Integer id;
    private String email;
    private String firstName;
    private String lastName;
    private String country;
    private String city;
    private String street;
    private String phoneNumber;
    private String type;
    private String requestText;

    public DeleteUserDataTable(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.country = user.getAddress().getCountry();
        this.city = user.getAddress().getCity();
        this.street = user.getAddress().getStreet();
        this.phoneNumber = user.getPhoneNumber();
        this.type = generateType(String.valueOf(user.getClass()));
        this.requestText = user.getDeletionRequest().getRequestText();
    }

    public String generateType(String rawType)  //formira ispis za tabelu
    {
        String retVal = "";
        String [] rawTypeSegments = rawType.split("\\.");
        retVal = rawTypeSegments[4];

        switch (retVal) {
            case "SuperAdmin":
                retVal = "Super Admin";
                break;
            case "Administrator":
                retVal = "Administrator";
                break;
            case "BoatOwner":
                retVal = "Boat Owner";
                break;
            case "FishingInstructor":
                retVal = "Fishing Instructor";
                break;
            case "CottageOwner":
                retVal = "Cottage Owner";
                break;
            case "Client":
                retVal = "Client";
                break;
        }

        return retVal;
    }
}
