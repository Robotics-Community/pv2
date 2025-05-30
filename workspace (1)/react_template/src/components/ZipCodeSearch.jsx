// src/components/ZipCodeSearch.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ZipCodeSearch = ({ onSearch }) => {
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

  const validateZipCode = (zip) => {
    // Basic US zip code validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
  };

  const handleSearch = () => {
    if (!zipCode.trim()) {
      setError('');
      onSearch(''); // Clear filter
      return;
    }

    if (!validateZipCode(zipCode)) {
      setError('Please enter a valid 5-digit zip code');
      return;
    }

    setError('');
    onSearch(zipCode);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Find events near you:
      </label>
      <div className="flex">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter zip code"
          className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          maxLength={10}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

ZipCodeSearch.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default ZipCodeSearch;