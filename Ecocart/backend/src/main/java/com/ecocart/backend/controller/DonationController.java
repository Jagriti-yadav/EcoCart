package com.ecocart.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecocart.backend.model.Donation;
import com.ecocart.backend.service.DonationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
public class DonationController {

    private final DonationService donationService;

    @PostMapping
    public ResponseEntity<?> createDonation(@RequestBody Donation donation) {
        log.info("Received donation request from: {}", donation.getDonor().getName());
        
        if (!donationService.validateDonation(donation)) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid donation data");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
        
        try {
            Donation processedDonation = donationService.processDonation(donation);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("transactionId", processedDonation.getTransactionId());
            response.put("message", "Donation processed successfully");
            response.put("donation", processedDonation);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            log.error("Error processing donation", e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to process donation");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<List<Donation>> getAllDonations() {
        List<Donation> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }
    @GetMapping("/recent")
    public ResponseEntity<List<Donation>> getRecentDonations(
            @RequestParam(defaultValue = "6") int limit) {
        List<Donation> donations = donationService.getRecentDonations(limit);
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/donor/{email}")
    public ResponseEntity<List<Donation>> getDonationsByEmail(@PathVariable String email) {
        List<Donation> donations = donationService.getDonationsByEmail(email);
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDonationStats() {
        Map<String, Object> stats = donationService.getDonationStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/top-donors")
    public ResponseEntity<List<Map<String, Object>>> getTopDonors(
            @RequestParam(defaultValue = "10") int limit) {
        List<Map<String, Object>> topDonors = donationService.getTopDonors(limit);
        return ResponseEntity.ok(topDonors);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "Donation service is running");
        return ResponseEntity.ok(response);
    }
}
