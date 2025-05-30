// src/components/Events.jsx
import React, { useState, useEffect } from 'react';
import { eventsData } from '../data/eventsData';
import ZipCodeSearch from './ZipCodeSearch';

const Events = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [displayedEvents, setDisplayedEvents] = useState(eventsData);
  const [filterType, setFilterType] = useState('all'); // 'all', 'team', or 'zip'
  
  // Dummy user team for demo purposes
  // In a real app, this would come from user profile or authentication
  const userTeams = [254, 1538]; 

  const filterEventsByTeam = (teamNumber) => {
    if (!teamNumber) {
      setFilterType('all');
      setDisplayedEvents(eventsData);
      return;
    }

    setFilterType('team');
    setSelectedTeam(teamNumber);
    const filteredEvents = eventsData.filter(event => 
      event.teams.includes(Number(teamNumber))
    );
    setDisplayedEvents(filteredEvents);
  };

  const filterEventsByZipCode = (zip) => {
    if (!zip) {
      setFilterType('all');
      setDisplayedEvents(eventsData);
      return;
    }

    setFilterType('zip');
    setZipCode(zip);

    // In a real application, this would use a geolocation API to find events by proximity
    // For this demo, we'll just filter events that have the same first 2 digits in zip code
    // as a simple way to simulate "proximity"
    const zipPrefix = zip.substring(0, 2);
    const filteredEvents = eventsData.filter(event => 
      event.zipCode.substring(0, 2) === zipPrefix
    );
    
    setDisplayedEvents(filteredEvents);
  };

  useEffect(() => {
    // Set default events on component mount
    setDisplayedEvents(eventsData);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by your team:
          </label>
          <select 
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => filterEventsByTeam(e.target.value)}
            value={selectedTeam || ''}
          >
            <option value="">All Events</option>
            {userTeams.map((team) => (
              <option key={team} value={team}>Team #{team}</option>
            ))}
          </select>
        </div>
        
        <div className="w-full sm:w-1/2">
          <ZipCodeSearch onSearch={filterEventsByZipCode} />
        </div>
      </div>

      {filterType !== 'all' && displayedEvents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 font-medium">
            {filterType === 'team' 
              ? `No events found for team #${selectedTeam}`
              : `No events found near zip code ${zipCode}`
            }
          </p>
          <button
            className="mt-3 text-blue-500 hover:underline"
            onClick={() => {
              setFilterType('all');
              setSelectedTeam(null);
              setZipCode('');
              setDisplayedEvents(eventsData);
            }}
          >
            View all events
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedEvents.map((event) => (
          <div key={event.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                {event.type}
              </span>
              <h3 className="text-lg font-bold mb-1">{event.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {event.date} • {event.location}
              </p>
              <p className="text-sm mb-4 line-clamp-2">{event.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Teams: {event.teams.length > 0 
                    ? event.teams.slice(0, 3).join(', ') + (event.teams.length > 3 ? '...' : '') 
                    : 'Open to all'}
                </span>
                <a 
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;