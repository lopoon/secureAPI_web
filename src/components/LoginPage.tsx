import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { Navigate } from 'react-router-dom';

interface LoginPageProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginPage({ isLoggedIn, setIsLoggedIn }:LoginPageProps) {

  const handleLogin = () => {
    try {
      // Perform login operation
      // If login is successful, set isLoggedIn to true
      setIsLoggedIn(true);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  if (isLoggedIn) {
    // comment out the next line to see the login page for easy development
    return <Navigate to="/profile" />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <LoginForm onLogin={handleLogin} />
        </div>
      </header>
    </div>
  );
}
export default LoginPage;
