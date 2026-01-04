package com.ecocart.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "donations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private double amount;
    
    @Column(nullable = false)
    private String frequency; 
    
    @Column(nullable = false)
    private String paymentMethod;
    
    @Embedded
    private DonorInfo donor;
    
    private String timestamp;
    
    @Column(unique = true)
    private String transactionId;
    
    @Column(nullable = false)
    private String status; 
}
