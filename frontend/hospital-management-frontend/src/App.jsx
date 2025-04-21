import React from 'react';
import PatientList from './components/PatientList';
import './app.css';

const App = () => {
    return (
        <div className="app-container">

            
            <header className="app-header">
                <h1>Hospital Management System</h1>
            </header>
            

            <main className="app-main">
                <PatientList />
            </main>

            <footer className="app-footer">
                <p>© {new Date().getFullYear()} Hospital Management System</p>
            </footer>
        </div>
    );
};

export default App;