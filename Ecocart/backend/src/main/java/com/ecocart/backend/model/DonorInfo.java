package com.ecocart.backend.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonorInfo {
    private String name;
    private String email;
    private String phone;
    private String pan;
    
    @jakarta.persistence.Column(length = 500)
    private String message;
}
