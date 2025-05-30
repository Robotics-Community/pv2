// src/components/mentorship/MentorshipPage.jsx
import React, { useState, useEffect } from 'react';
import MentorshipForm from './MentorshipForm';
import MentorshipMatches from './MentorshipMatches';
import { teamsData } from '../../data/teamsData';
import { mentorshipData } from '../../data/mentorshipData';

const MentorshipPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [matches, setMatches] = useState([]);

  // Function to find matches based on form data
  const findMatches = (data) => {
    // Filter mentorship data based on form preferences
    let filteredMatches = [];
    
    // If the team is looking to be a mentor, find mentees
    if (data.role === 'mentor') {
      filteredMatches = mentorshipData.filter(mentee => {
        // Only look at teams seeking mentorship
        if (mentee.role !== 'mentee') return false;
        
        // Match by league preference
        const leagueMatch = data.preferredMenteeLeague.includes(mentee.roboticsLeague);
        
        // Match by at least one specialization/area needing help
        const skillMatch = data.specializations.some(skill => 
          mentee.areasNeedingHelp.includes(skill)
        );
        
        // Virtual mentoring match
        const virtualMatch = (data.virtualOnly && mentee.virtualOnly) || !data.virtualOnly;
        
        return leagueMatch && skillMatch && virtualMatch;
      });
    } 
    // If the team is looking for a mentor, find potential mentors
    else {
      filteredMatches = mentorshipData.filter(mentor => {
        // Only look at teams offering mentorship
        if (mentor.role !== 'mentor') return false;
        
        // Match by league preference
        const leagueMatch = mentor.preferredMenteeLeague.includes(data.roboticsLeague);
        
        // Match by at least one specialization/area needing help
        const skillMatch = data.areasNeedingHelp.some(skill =>
          mentor.specializations.includes(skill)
        );
        
        // Virtual mentoring match
        const virtualMatch = (data.virtualOnly && mentor.virtualOnly) || !data.virtualOnly;
        
        return leagueMatch && skillMatch && virtualMatch;
      });
    }
    
    // Combine with team data to get full information
    const matchesWithTeamInfo = filteredMatches.map(match => {
      const teamInfo = teamsData.find(team => team.id === match.teamId);
      return {
        ...match,
        teamName: teamInfo?.name || 'Unknown Team',
        teamNumber: teamInfo?.number || '?',
        teamLocation: teamInfo?.location || 'Unknown',
        teamProfileImage: teamInfo?.profileImage || '/assets/images/team_profile.jpg',
        teamDescription: teamInfo?.description || ''
      };
    });
    
    return matchesWithTeamInfo;
  };

  const handleFormSubmit = (data) => {
    // Process form data
    setFormData(data);
    // Find matches
    const matchResults = findMatches(data);
    setMatches(matchResults);
    setFormSubmitted(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('matches-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setFormData(null);
    setMatches([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mentorship Matchmaking</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Connect with other robotics teams for mentorship opportunities. Whether your team wants to mentor others or is seeking guidance, find your perfect match here.
        </p>
      </div>
      
      {!formSubmitted ? (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <MentorshipForm onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Mentorship Profile</h2>
            <button 
              onClick={handleReset} 
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition"
            >
              Edit Profile
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium text-gray-700">Role:</p>
              <p className="capitalize">{formData?.role}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium text-gray-700">League:</p>
              <p>{formData?.roboticsLeague}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium text-gray-700">{formData?.role === 'mentor' ? 'Specializations:' : 'Areas Needing Help:'}</p>
              <p>{formData?.role === 'mentor' 
                ? formData?.specializations.join(', ') 
                : formData?.areasNeedingHelp.join(', ')}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium text-gray-700">Location:</p>
              <p>{formData?.location} {formData?.virtualOnly ? '(Virtual only)' : ''}</p>
            </div>
            {formData?.role === 'mentor' && (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium text-gray-700">Preferred Mentee Leagues:</p>
                <p>{formData?.preferredMenteeLeague.join(', ')}</p>
              </div>
            )}
            <div className="bg-gray-50 p-4 rounded-md col-span-1 md:col-span-2">
              <p className="font-medium text-gray-700">Description:</p>
              <p>{formData?.description}</p>
            </div>
          </div>
        </div>
      )}
      
      {formSubmitted && (
        <div id="matches-section" className="mt-8">
          <MentorshipMatches 
            matches={matches} 
            userRole={formData?.role}
          />
        </div>
      )}
    </div>
  );
};

export default MentorshipPage;