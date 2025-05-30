// src/components/Team.jsx
import React from 'react';

const Team = ({ team }) => {
  return (
    <div className="p-4 border rounded shadow-md bg-white max-w-sm mx-auto">
      <img src={team.logo} alt={`${team.name} logo`} className="w-16 h-16 rounded-full mx-auto" />
      <h2 className="text-lg font-bold text-center">{team.name}</h2>
      <p className="text-center">{team.bio}</p>
      <ul className="mt-2">
        {team.members.map((member) => (
          <li key={member.userId} className="text-sm text-center">
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;