// src/components/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teamsData } from '../data/teamsData';

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // Close search when clicking outside of the search component
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = teamsData.filter(team => 
      team.name.toLowerCase().includes(term) || 
      team.number.toString().includes(term)
    ).slice(0, 5);

    setSearchResults(results);
  }, [searchTerm]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus the search input when opening
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <button 
        onClick={toggleSearch} 
        className="p-2 hover:text-yellow-500 focus:outline-none"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      {isSearchOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg z-50">
          <div className="p-2">
            <input
              id="search-input"
              type="text"
              placeholder="Search teams or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          
          {searchResults.length > 0 && (
            <ul className="max-h-72 overflow-y-auto border-t">
              {searchResults.map((result) => (
                <li key={result.id} className="border-b last:border-b-0">
                  <Link 
                    to={`/teams/chat/${result.id}`}
                    className="flex items-center p-3 hover:bg-gray-50"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchTerm('');
                    }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img 
                        src={result.profileImage} 
                        alt={result.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-gray-500">#{result.number}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          
          {searchTerm.trim() !== '' && searchResults.length === 0 && (
            <div className="p-4 text-center text-gray-500 border-t">
              No teams found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;