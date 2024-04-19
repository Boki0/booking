package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeletionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "request_text", nullable = false)
    private String requestText;

    public DeletionRequest(Integer userId, String requestText)
    {
        this.id = userId;
        this.active = true;
        this.requestText = requestText;
    }
}
