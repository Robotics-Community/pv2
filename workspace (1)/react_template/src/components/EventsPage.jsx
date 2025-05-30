// src/components/EventsPage.jsx
import React from 'react';
import Events from './Events';

const EventsPage = () => {
  return (
    <div className="container mx-auto px-4 pt-16 pb-8">
      <h1 className="text-2xl font-bold mb-4">Events Calendar</h1>
      <p className="text-gray-600 mb-6">
        Discover upcoming robotics events, competitions, and workshops.
        Filter by team or location to find events near you or relevant to your interests.
      </p>
      <Events />
    </div>
  );
};

export default EventsPage;