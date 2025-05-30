// src/components/TeamChannels.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { teamsData } from '../data/teamsData';
import { beehiveData } from '../data/beehiveData';

const TeamChannels = () => {
  // Filter teams that have videos in the beehive
  // In a real application, this would be more sophisticated
  const teamsWithVideos = teamsData.filter(team => 
    beehiveData.some(video => video.user.username.includes(team.number.toString()))
  );

  // If not enough teams have videos, add some more
  const displayedTeams = teamsWithVideos.length >= 5 ? 
    teamsWithVideos.slice(0, 10) : 
    teamsData.slice(0, 10);

  return (
    <div className="bg-white border-b overflow-x-auto">
      <div className="p-3">
        <h2 className="text-lg font-bold mb-2 px-2">Team Channels</h2>
        <div className="flex space-x-4 p-2">
          {displayedTeams.map(team => (
            <Link 
              key={team.id}
              to={`/team/${team.number}`}
              className="flex flex-col items-center transition-transform hover:scale-105"
            >
              <div className="w-16 h-16 rounded-full ring-2 ring-blue-500 p-0.5 bg-white">
                <img
                  src={team.profileImage}
                  alt={team.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center mt-1">
                <span className="text-xs font-medium truncate w-20 text-center">
                  {team.name}
                </span>
                <span className="text-xs text-gray-500">
                  #{team.number}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamChannels;