// src/components/Team.jsx
import React from 'react';

const Team = ({ team }) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <img src={team.logo} alt={`${team.name} logo`} className="w-16 h-16 rounded-full" />
      <h2 className="text-lg font-bold">{team.name}</h2>
      <p>{team.bio}</p>
      <ul className="mt-2">
        {team.members.map((member) => (
          <li key={member.userId} className="text-sm">
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;