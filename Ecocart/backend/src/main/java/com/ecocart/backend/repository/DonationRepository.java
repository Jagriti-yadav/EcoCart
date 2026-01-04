package com.ecocart.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ecocart.backend.model.Donation;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    
    Optional<Donation> findByTransactionId(String transactionId);
    
    List<Donation> findByStatus(String status);
    
    List<Donation> findByFrequency(String frequency);
    
    @Query("SELECT d FROM Donation d WHERE d.donor.email = ?1")
    List<Donation> findByDonorEmail(String email);
    
    @Query("SELECT SUM(d.amount) FROM Donation d WHERE d.status = 'completed'")
    Double getTotalDonationsAmount();
    
    long countByStatus(String status);
}
