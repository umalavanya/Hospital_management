
const API_BASE_URL = 'http://localhost:8080/api/patients';

export const fetchPatients = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch patients');
    }
    return await response.json();
};

export const fetchPatient = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch patient');
    }
    return await response.json();
};

export const createPatient = async (patientData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
    });
    if (!response.ok) {
        throw new Error('Failed to create patient');
    }
    return await response.json();
};

export const updatePatient = async (id, patientData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
    });
    if (!response.ok) {
        throw new Error('Failed to update patient');
    }
    return await response.json();
};

export const deletePatient = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete patient');
    }
    return true;
};
