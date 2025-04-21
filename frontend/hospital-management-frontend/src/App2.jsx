import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PatientList from './components/PatientList';
import Home from './components/Home';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    // You might want to verify the token with your backend here
                    setIsAuthenticated(true);
                }
            } catch (err) {
                console.error(err.message);
            }
        };
        checkAuth();
    }, []);

    return (
        <Router>
            <div className="app-container">
                <Navigation isAuthenticated={isAuthenticated} setAuth={setAuth} />
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={
                                !isAuthenticated ? (
                                    <Login setAuth={setAuth} />
                                ) : (
                                    <Navigate to="/dashboard" />
                                )
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                isAuthenticated ? (
                                    <PatientList setAuth={setAuth} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <footer className="app-footer">
                    <p>© {new Date().getFullYear()} Hospital Management System</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;