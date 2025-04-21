import React, { useState, useEffect } from 'react';
import { fetchPatients, deletePatient } from '../services/api';
import PatientForm from './PatientForm';


const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(null);

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await fetchPatients();
                setPatients(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        loadPatients();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await deletePatient(id);
                setPatients(patients.filter(patient => patient.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleEdit = (patient) => {
        setCurrentPatient(patient);
        setShowForm(true);
    };

    const handleFormSuccess = async () => {
        try {
            const data = await fetchPatients();
            setPatients(data);
            setShowForm(false);
            setCurrentPatient(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="patient-management">
            <div className="header">
                <h2>Patient Management</h2>
                <button onClick={() => setShowForm(true)} className="btn-primary">
                    Add New Patient
                </button>
            </div>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <PatientForm
                            patientId={currentPatient?.id}
                            onSuccess={handleFormSuccess}
                            onCancel={() => {
                                setShowForm(false);
                                setCurrentPatient(null);
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="patient-table-container">
                <table className="patient-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.patientName}</td>
                                <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                                <td>
                                    {patient.gender === 'M' ? 'Male' : 
                                     patient.gender === 'F' ? 'Female' : 'Other'}
                                </td>
                                <td>{patient.phoneNumber}</td>
                                <td>
                                    <button 
                                        onClick={() => handleEdit(patient)}
                                        className="btn-edit"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(patient.id)}
                                        className="btn-delete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientList;