package com.example.demo;

import com.example.demo.dto.NewReservationDTO;
import com.example.demo.repository.ClientRepository;
import com.example.demo.repository.OfferRepository;
import com.example.demo.repository.ReservationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE) // Koristi stvarnu bazu podataka
public class ReservationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private OfferRepository offerRepository; // Koristite stvarne repozitorije
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ReservationRepository reservationRepository;


    @WithMockUser(username = "user", roles = {"CLIENT"})
    @Test
    public void testNewReservationByUser_Success() throws Exception {
        Integer clientId = 7;
        Integer offerId = 3;

        // Construct the JSON body with all necessary fields
        String requestBody = "{"

                + "\"additionalServices\": []," // Adjust as needed
                + "\"endDate\": \"2025-09-24T22:00:00.000Z\","
                + "\"numOfAttendants\": 5,"
                + "\"price\": \"540\","
                + "\"startDate\": \"2025-09-18T22:00:00.000Z\""
                + "}";


        mockMvc.perform(MockMvcRequestBuilders.post("/api/newReservationUser/{clientId}/{offerId}", clientId, offerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));
    }
    @WithMockUser(username = "user", roles = {"CLIENT"})
    @Test
    public void testNewReservationByUser2_Success() throws Exception {
        Integer clientId = 7;
        Integer offerId = 3;

        // Construct the JSON body with all necessary fields
        String requestBody = "{"
                + "\"someField\": \"someValue\","
                + "\"additionalServices\": [],"
                + "\"endDate\": \"2025-10-12T22:00:00.000Z\","
                + "\"numOfAttendants\": 5,"
                + "\"price\": \"2540\","
                + "\"startDate\": \"2025-09-26T22:00:00.000Z\""
                + "}";


        mockMvc.perform(MockMvcRequestBuilders.post("/api/newReservationUser/{clientId}/{offerId}", clientId, offerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));
    }

    @WithMockUser(username = "user", roles = {"CLIENT"})
    @Test
    public void testNewReservationByUser3_time() throws Exception {
        Integer clientId = 7;
        Integer offerId = 3;

        // Construct the JSON body with all necessary fields
        String requestBody = "{"
                + "\"additionalServices\": []," // Adjust as needed
                + "\"endDate\": \"2025-09-26T22:00:00.000Z\","
                + "\"numOfAttendants\": 5,"
                + "\"price\": \"540\","
                + "\"startDate\": \"2025-09-30T22:00:00.000Z\""
                + "}";


        mockMvc.perform(MockMvcRequestBuilders.post("/api/newReservationUser/{clientId}/{offerId}", clientId, offerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(MockMvcResultMatchers.content().string("false"));
    }

    @WithMockUser(username = "user", roles = {"CLIENT"})
    @Test
    public void testNewReservationByUser4_wrong_userid() throws Exception {
        Integer clientId = 734;
        Integer offerId = 3;

        // Construct the JSON body with all necessary fields
        String requestBody = "{"

                + "\"additionalServices\": []," // Adjust as needed
                + "\"endDate\": \"2025-09-24T22:00:00.000Z\","
                + "\"numOfAttendants\": 5,"
                + "\"price\": \"540\","
                + "\"startDate\": \"2025-09-18T22:00:00.000Z\""
                + "}";


        mockMvc.perform(MockMvcRequestBuilders.post("/api/newReservationUser/{clientId}/{offerId}", clientId, offerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().string("false"));
    }
    @WithMockUser(username = "user", roles = {"CLIENT"})
    @Test
    public void testNewReservationByUser5_Success() throws Exception {
        Integer clientId = 7;
        Integer offerId = 34343;

        // Construct the JSON body with all necessary fields
        String requestBody = "{"

                + "\"additionalServices\": []," // Adjust as needed
                + "\"endDate\": \"2025-09-24T22:00:00.000Z\","
                + "\"numOfAttendants\": 5,"
                + "\"price\": \"540\","
                + "\"startDate\": \"2025-09-18T22:00:00.000Z\""
                + "}";


        mockMvc.perform(MockMvcRequestBuilders.post("/api/newReservationUser/{clientId}/{offerId}", clientId, offerId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().string("false"));
    }

}
