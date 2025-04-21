import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Badge, Alert, Spinner } from 'react-bootstrap';
import { PencilSquare, ArrowLeft } from 'react-bootstrap-icons';
import PatientService from '../services/api'; // Adjust the path based on your project structure

const PatientView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await PatientService.getPatientById(id);
        setPatient(response.data);
      } catch (err) {
        setError('Failed to load patient data');
        console.error('Error fetching patient:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getGenderBadge = (gender) => {
    const variants = {
      'M': 'primary',
      'F': 'danger',
      'O': 'secondary'
    };
    return (
      <Badge bg={variants[gender] || 'secondary'}>
        {gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : 'Other'}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!patient) {
    return (
      <Container>
        <Alert variant="warning">Patient not found</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Button 
        variant="outline-secondary" 
        className="mb-3" 
        onClick={() => navigate('/patients')}
      >
        <ArrowLeft className="me-2" />
        Back to Patients
      </Button>

      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Patient Details</h3>
          <Button 
            variant="primary"
            onClick={() => navigate(`/patients/${id}/edit`)}
          >
            <PencilSquare className="me-2" />
            Edit
          </Button>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <h5>Basic Information</h5>
              <hr />
              <Row>
                <Col sm={4} className="fw-bold">Name:</Col>
                <Col sm={8}>{patient.patientName}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">Date of Birth:</Col>
                <Col sm={8}>{formatDate(patient.dateOfBirth)}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">Gender:</Col>
                <Col sm={8}>{getGenderBadge(patient.gender)}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">Blood Group:</Col>
                <Col sm={8}>{patient.bloodGroup || 'N/A'}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">Marital Status:</Col>
                <Col sm={8}>{patient.maritalStatus || 'N/A'}</Col>
              </Row>
            </Col>

            <Col md={6}>
              <h5>Contact Information</h5>
              <hr />
              <Row>
                <Col sm={4} className="fw-bold">Phone:</Col>
                <Col sm={8}>{patient.phoneNumber}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">Email:</Col>
                <Col sm={8}>{patient.email || 'N/A'}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">Address:</Col>
                <Col sm={8}>{patient.address || 'N/A'}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">City:</Col>
                <Col sm={8}>{patient.city || 'N/A'}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">State:</Col>
                <Col sm={8}>{patient.state || 'N/A'}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">Postal Code:</Col>
                <Col sm={8}>{patient.postalCode || 'N/A'}</Col>
              </Row>
              <Row className="mt-2">
                <Col sm={4} className="fw-bold">Country:</Col>
                <Col sm={8}>{patient.country || 'N/A'}</Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientView;