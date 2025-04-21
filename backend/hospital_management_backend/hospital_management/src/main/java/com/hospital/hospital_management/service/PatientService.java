package com.hospital.hospital_management.service;

import com.hospital.hospital_management.model.Patient;
import com.hospital.hospital_management.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    @Autowired
    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    // Create a new patient
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get patient by ID
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    // Update patient
    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        patient.setPatientName(patientDetails.getPatientName());
        patient.setDateOfBirth(patientDetails.getDateOfBirth());
        patient.setGender(patientDetails.getGender());
        patient.setBloodGroup(patientDetails.getBloodGroup());
        patient.setMaritalStatus(patientDetails.getMaritalStatus());
        patient.setPhoneNumber(patientDetails.getPhoneNumber());
        patient.setEmail(patientDetails.getEmail());
        patient.setAddress(patientDetails.getAddress());
        patient.setCity(patientDetails.getCity());
        patient.setState(patientDetails.getState());
        patient.setPostalCode(patientDetails.getPostalCode());
        patient.setCountry(patientDetails.getCountry());

        return patientRepository.save(patient);
    }

    // Delete patient
    public void deletePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
        patientRepository.delete(patient);
    }

    // Additional business logic methods can be added here
}