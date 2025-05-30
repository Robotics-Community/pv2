// src/components/NavBar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';

const NavBar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Colors with yellow-500 as primary
  const primaryColor = 'text-yellow-600';
  const hoverColor = 'hover:text-yellow-500';

  return (
    <nav className="fixed top-0 w-full bg-white border-b z-50">
      <div className="max-w-screen-lg mx-auto px-4 h-14 flex items-center justify-between">
        {/* RoboHive Logo */}
        <div className="text-xl font-semibold tracking-tighter text-yellow-500">
          <Link to="/" className="flex items-center">
            <span>RoboHive</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <Link to="/" className={`p-2 ${hoverColor}`}>Home</Link>
              <Link to="/beehive" className={`p-2 ${hoverColor}`}>Beehive</Link>
              <Link to="/teams" className={`p-2 ${hoverColor}`}>Teams</Link>
              <Link to="/stats" className={`p-2 ${hoverColor}`}>Stats</Link>
              <Link to="/events" className={`p-2 ${hoverColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Link>
              
              {/* Search Bar */}
              <SearchBar />
              
              {/* Icons */}
              <button className={`p-2 ${hoverColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className={`p-2 ${hoverColor}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              
              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 focus:outline-none"
                >
                  {currentUser?.username?.charAt(0).toUpperCase() || '?'}
                </button>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{currentUser?.username || 'User'}</div>
                      <div className="text-gray-500 text-xs">
                        {currentUser?.accountType === 'team' ? 'Team Account' : 'Fan Account'}
                      </div>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          
          {!isAuthenticated && (
            <>
              <Link to="/login" className={`p-2 font-medium ${primaryColor} ${hoverColor}`}>Sign in</Link>
              <Link to="/signup" className="p-2 bg-yellow-500 text-white font-medium px-4 py-2 rounded-md hover:bg-yellow-600">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;