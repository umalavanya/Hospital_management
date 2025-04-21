import React, { useState, useEffect } from 'react';
import { fetchPatient, createPatient, updatePatient } from '../services/api';

const PatientForm = ({ patientId, onSuccess, onCancel }) => {
    const [patient, setPatient] = useState({
        patientName: '',
        dateOfBirth: '',
        gender: 'M',
        bloodGroup: '',
        maritalStatus: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India'
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (patientId) {
            const loadPatient = async () => {
                try {
                    const data = await fetchPatient(patientId);
                    // Convert date to local format for the input field
                    const formattedData = {
                        ...data,
                        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : ''
                    };
                    setPatient(formattedData);
                } catch (error) {
                    console.error('Error loading patient:', error);
                }
            };
            loadPatient();
        }
    }, [patientId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!patient.patientName.trim()) newErrors.patientName = 'Patient name is required';
        if (!patient.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!patient.gender) newErrors.gender = 'Gender is required';
        if (!patient.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (patientId) {
                await updatePatient(patientId, patient);
            } else {
                await createPatient(patient);
            }
            onSuccess();
        } catch (error) {
            console.error('Error saving patient:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="patient-form">
            <div className="form-group">
                <label>Patient Name*</label>
                <input
                    type="text"
                    name="patientName"
                    value={patient.patientName}
                    onChange={handleChange}
                    className={errors.patientName ? 'error' : ''}
                />
                {errors.patientName && <span className="error-message">{errors.patientName}</span>}
            </div>

            <div className="form-group">
                <label>Date of Birth*</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={patient.dateOfBirth}
                    onChange={handleChange}
                    className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>

            <div className="form-group">
                <label>Gender*</label>
                <select
                    name="gender"
                    value={patient.gender}
                    onChange={handleChange}
                    className={errors.gender ? 'error' : ''}
                >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>

            <div className="form-group">
                <label>Blood Group</label>
                <select
                    name="bloodGroup"
                    value={patient.bloodGroup || ''}
                    onChange={handleChange}
                >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>

            <div className="form-group">
                <label>Marital Status</label>
                <select
                    name="maritalStatus"
                    value={patient.maritalStatus || ''}
                    onChange={handleChange}
                >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                </select>
            </div>

            <div className="form-group">
                <label>Phone Number*</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={patient.phoneNumber}
                    onChange={handleChange}
                    className={errors.phoneNumber ? 'error' : ''}
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={patient.email || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Address</label>
                <textarea
                    name="address"
                    value={patient.address || ''}
                    onChange={handleChange}
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={patient.city || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>State</label>
                    <input
                        type="text"
                        name="state"
                        value={patient.state || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={patient.postalCode || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={patient.country}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {patientId ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={onCancel} className="btn-secondary">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default PatientForm;