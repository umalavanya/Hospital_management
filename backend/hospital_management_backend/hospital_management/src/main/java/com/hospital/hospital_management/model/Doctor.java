package com.hospital.hospital_management.model;
import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private String contactInfo;

    @Column(nullable = false)
    private String workingHours;

    // Constructors, getters, and setters
    public Doctor() {}

    public Doctor(String name, String specialization, String contactInfo, String workingHours) {
        this.name = name;
        this.specialization = specialization;
        this.contactInfo = contactInfo;
        this.workingHours = workingHours;
    }

    // Generate all getters and setters here
    // (You can use your IDE to generate these)
}
