// src/components/mentorship/MentorshipMatches.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MentorshipMatches = ({ matches, userRole }) => {
  // Role to display - if user is a mentor, we're showing mentees and vice versa
  const matchRoleDisplay = userRole === 'mentor' ? 'mentee' : 'mentor';

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Matching Teams</h2>
      
      {matches.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No matches found</h3>
            <p className="mt-2 text-base text-gray-500">
              We couldn't find any {matchRoleDisplay} teams that match your criteria. 
              Try broadening your preferences or check back later as more teams join the platform.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={match.teamProfileImage} 
                      alt={match.teamName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{match.teamName}</h3>
                    <p className="text-sm text-gray-600">#{match.teamNumber} • {match.teamLocation}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex-1">
                <div className="mb-4">
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide mb-1">
                    {match.roboticsLeague}
                  </span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide ml-1">
                    {match.virtualOnly ? 'Virtual' : 'In-Person Available'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                  {match.description.length > 150 
                    ? `${match.description.substring(0, 150)}...` 
                    : match.description}
                </p>
                
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {userRole === 'mentor' ? 'Areas Needing Help:' : 'Specializes In:'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(userRole === 'mentor' 
                      ? match.areasNeedingHelp 
                      : match.specializations
                    ).map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {userRole === 'mentor' 
                    ? `Experience: ${match.teamExperience}` 
                    : `${match.yearsOfExperience} years of experience`}
                </span>
                <Link 
                  to={`/teams/chat/${match.teamId}`}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Connect
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {matches.length > 0 && (
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm leading-5 font-medium text-yellow-800">
                Next Steps
              </h3>
              <div className="mt-2 text-sm leading-5 text-yellow-700">
                <p>
                  Click "Connect" to start a conversation with a matching team. 
                  When reaching out, introduce yourselves and explain what you hope to 
                  achieve through this mentorship relationship.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorshipMatches;