package com.hospital.hospital_management.repository;

import com.hospital.hospital_management.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Custom query methods can be added here if needed
    // For example:
    // List<Patient> findByPatientNameContaining(String name);
}