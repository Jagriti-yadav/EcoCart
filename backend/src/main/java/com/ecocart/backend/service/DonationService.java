package com.ecocart.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecocart.backend.model.Donation;
import com.ecocart.backend.repository.DonationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class DonationService {
    
    private final DonationRepository donationRepository;

    public Donation processDonation(Donation donation) {
        log.info("Processing donation of ₹{} from {}", donation.getAmount(), donation.getDonor().getName());
        
        donation.setTransactionId("TXN" + System.currentTimeMillis());
        donation.setStatus("completed");
        
        if (donation.getTimestamp() == null || donation.getTimestamp().isEmpty()) {
            donation.setTimestamp(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        }
        
        Donation savedDonation = donationRepository.save(donation);
        
        log.info("Donation processed successfully. Transaction ID: {}", savedDonation.getTransactionId());
        return savedDonation;
    }

    public List<Donation> getAllDonations() {
        log.debug("Fetching all donations");
        return donationRepository.findAll();
    }

    public List<Donation> getRecentDonations(int limit) {
        log.debug("Fetching {} recent donations", limit);
        return donationRepository.findAll(Sort.by(Sort.Direction.DESC, "timestamp"))
                .stream()
                .limit(limit)
                .collect(Collectors.toList());
    }

    public List<Donation> getDonationsByEmail(String email) {
        log.debug("Fetching donations for email: {}", email);
        return donationRepository.findByDonorEmail(email);
    }

    public Map<String, Object> getDonationStats() {
        log.debug("Calculating donation statistics");
        Map<String, Object> stats = new HashMap<>();
        
        List<Donation> allDonations = donationRepository.findAll();
        
        stats.put("totalDonations", allDonations.size());
        
        Double totalAmount = donationRepository.getTotalDonationsAmount();
        stats.put("totalAmount", totalAmount != null ? totalAmount : 0.0);
        
        stats.put("averageDonation", allDonations.stream()
                .mapToDouble(Donation::getAmount)
                .average()
                .orElse(0.0));
        
        Map<String, Long> frequencyCount = allDonations.stream()
                .collect(Collectors.groupingBy(Donation::getFrequency, Collectors.counting()));
        stats.put("frequencyCounts", frequencyCount);
        
        Map<String, Long> paymentMethodCount = allDonations.stream()
                .collect(Collectors.groupingBy(Donation::getPaymentMethod, Collectors.counting()));
        stats.put("paymentMethodCounts", paymentMethodCount);
        
        long totalTrees = allDonations.stream()
                .mapToLong(d -> (long) (d.getAmount() / 100))
                .sum();
        stats.put("treesPlanted", totalTrees);
        
        stats.put("largestDonation", allDonations.stream()
                .mapToDouble(Donation::getAmount)
                .max()
                .orElse(0.0));
        
        return stats;
    }
    public List<Map<String, Object>> getTopDonors(int limit) {
        log.debug("Fetching top {} donors", limit);
        
        List<Donation> allDonations = donationRepository.findAll();
        
        Map<String, Double> donorTotals = new HashMap<>();
        Map<String, String> donorNames = new HashMap<>();
        
        for (Donation donation : allDonations) {
            String email = donation.getDonor().getEmail();
            donorTotals.merge(email, donation.getAmount(), Double::sum);
            donorNames.putIfAbsent(email, donation.getDonor().getName());
        }
        
        return donorTotals.entrySet().stream()
                .sorted((e1, e2) -> Double.compare(e2.getValue(), e1.getValue()))
                .limit(limit)
                .map(entry -> {
                    Map<String, Object> donor = new HashMap<>();
                    donor.put("email", entry.getKey());
                    donor.put("name", donorNames.get(entry.getKey()));
                    donor.put("totalAmount", entry.getValue());
                    donor.put("treesPlanted", (long) (entry.getValue() / 100));
                    return donor;
                })
                .collect(Collectors.toList());
    }

    public boolean validateDonation(Donation donation) {
        if (donation == null) {
            log.warn("Donation is null");
            return false;
        }
        
        if (donation.getAmount() < 100) {
            log.warn("Donation amount is less than minimum (₹100)");
            return false;
        }
        
        if (donation.getDonor() == null) {
            log.warn("Donor information is missing");
            return false;
        }
        
        if (donation.getDonor().getName() == null || donation.getDonor().getName().trim().isEmpty()) {
            log.warn("Donor name is missing");
            return false;
        }
        
        if (donation.getDonor().getEmail() == null || !donation.getDonor().getEmail().matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")) {
            log.warn("Donor email is invalid");
            return false;
        }
        
        return true;
    }
}
