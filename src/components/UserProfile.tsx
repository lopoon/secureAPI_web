import React, { useEffect, useState, useContext }  from 'react';
import authService from '../services/auth.service';
import UserContext from './UserContext';

const UserProfile = () => {
  const userData = useContext(UserContext);
  return (
    <div>
      <div>
        user profile
      </div>
      <div>
        {userData.userData ? (
          <div>
            <h1>User info</h1>
            <p>user: {userData.userData.display_name}</p>
            <div>last login: {userData.userData.last_login}</div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;