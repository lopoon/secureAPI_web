import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import UserContext from './components/UserContext';
import initialUserData from './initialUserData';


function App() {
  const [userData, setUserData] = useState(initialUserData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    setIsLoggedIn(false);
  };
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <header className="sticky">
          <span className="logo">
            <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
          </span>
          <NavLink to="/" className="button rounded">
            <span className="icon-home"></span>
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/profile" className="button rounded">
                Profile
              </NavLink>
              <NavLink to="/login" className="button rounded" onClick={logout}>
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" className="button rounded">
              Login
            </NavLink>
          )}
        </header>
        <Routes>
          <Route path="/" />
          <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
