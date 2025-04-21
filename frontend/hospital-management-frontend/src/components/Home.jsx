import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Welcome to Hospital Management System</h1>
                <p>Efficient patient management for modern healthcare facilities</p>
                <div className="cta-buttons">
                    <Link to="/dashboard" className="btn btn-primary">
                        View Patients
                    </Link>
                    <Link to="/about" className="btn btn-secondary">
                        Learn More
                    </Link>
                </div>
            </div>
            
            <div className="features-section">
                <h2>Key Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Patient Management</h3>
                        <p>Comprehensive patient records with medical history</p>
                    </div>
                    <div className="feature-card">
                        <h3>Appointment Scheduling</h3>
                        <p>Efficient scheduling and calendar integration</p>
                    </div>
                    <div className="feature-card">
                        <h3>Secure Access</h3>
                        <p>Role-based authentication and authorization</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;