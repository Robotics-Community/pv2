// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage when component mounts
    const storedUser = localStorage.getItem('robohive_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // This is a mock authentication
    // In a real app, this would call an API endpoint
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // For demo, accept any non-empty credentials
        if (email && password) {
          const user = {
            id: Math.random().toString(36).substring(2, 9),
            email,
            username: email.split('@')[0],
            // In a real app, you wouldn't store the password
          };
          localStorage.setItem('robohive_user', JSON.stringify(user));
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const signup = (userData) => {
    // This is a mock signup
    // In a real app, this would call an API endpoint
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        try {
          const { email, username, password, accountType } = userData;
          
          // Basic validation
          if (!email || !username || !password || !accountType) {
            throw new Error('All fields are required');
          }
          
          const user = {
            id: Math.random().toString(36).substring(2, 9),
            email,
            username,
            accountType,
            createdAt: new Date().toISOString(),
          };
          
          localStorage.setItem('robohive_user', JSON.stringify(user));
          setCurrentUser(user);
          resolve(user);
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('robohive_user');
    setCurrentUser(null);
    return Promise.resolve();
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;