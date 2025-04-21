import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isAuthenticated, setAuth }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuth(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Hospital Management</Link>
            </div>
            
            <div className="navbar-links">
                <Link to="/">Home</Link>
                {isAuthenticated && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/patients">Patients</Link>
                        <Link to="/appointments">Appointments</Link>
                    </>
                )}
                {!isAuthenticated ? (
                    <Link to="/login" className="btn-login">Login</Link>
                ) : (
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navigation;