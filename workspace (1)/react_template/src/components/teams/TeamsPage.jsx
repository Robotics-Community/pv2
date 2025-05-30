import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { teamsData } from '../../data/teamsData';

const TeamsPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teamsData.filter(team => {
    const matchesCategory = filter === 'all' || team.category === filter;
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          team.number.toString().includes(searchTerm) ||
                          team.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 px-4 pb-20 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Connect with Teams</h1>
      
      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name, number, or location"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('FRC')} 
            className={`px-4 py-2 rounded-full ${filter === 'FRC' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            FRC
          </button>
          <button 
            onClick={() => setFilter('FTC')} 
            className={`px-4 py-2 rounded-full ${filter === 'FTC' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            FTC
          </button>
          <button 
            onClick={() => setFilter('VEX')} 
            className={`px-4 py-2 rounded-full ${filter === 'VEX' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            VEX
          </button>
        </div>
      </div>

      {/* Teams List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTeams.map(team => (
          <div key={team.id} className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src={team.profileImage} 
                  alt={`${team.name} logo`}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h3 className="font-bold">{team.name} #{team.number}</h3>
                <p className="text-sm text-gray-600">{team.category} · {team.location}</p>
                <p className="text-xs text-gray-500">
                  {team.mentorshipStatus === 'offering' ? 'Offering Mentorship' : 'Seeking Mentorship'}
                </p>
              </div>
            </div>
            <Link 
              to={`/teams/chat/${team.id}`} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Contact
            </Link>
          </div>
        ))}
      </div>
      
      {filteredTeams.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No teams found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;