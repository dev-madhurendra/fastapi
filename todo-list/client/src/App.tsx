import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/LoginPage';

const App = () => {
  const isAuthenticated = localStorage.getItem("token") !== null
  React.useEffect(() => {

  },[isAuthenticated])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <SignInPage />} />
      </Routes>
    </Router>
  );
};

export default App;
