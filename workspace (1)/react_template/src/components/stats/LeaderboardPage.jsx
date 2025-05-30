import React, { useState } from 'react';
import { leaderboardData } from '../../data/leaderboardData';

const LeaderboardPage = () => {
  const [selectedLeague, setSelectedLeague] = useState('FRC');
  const [selectedSeason, setSelectedSeason] = useState('2023-2024');
  
  // Get unique leagues from data
  const leagues = [...new Set(leaderboardData.map(item => item.league))];
  
  // Get unique seasons from the selected league
  const seasons = [...new Set(
    leaderboardData
      .filter(item => item.league === selectedLeague)
      .map(item => item.season)
  )];
  
  // Filter data by selected league and season
  const filteredData = leaderboardData.filter(
    item => item.league === selectedLeague && item.season === selectedSeason
  );

  return (
    <div className="pt-20 px-4 pb-20 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Statistics & Leaderboards</h1>
      
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">League</label>
          <select 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedLeague}
            onChange={(e) => {
              setSelectedLeague(e.target.value);
              // Reset season to first available season in the new league
              const newLeagueSeasons = [...new Set(
                leaderboardData
                  .filter(item => item.league === e.target.value)
                  .map(item => item.season)
              )];
              setSelectedSeason(newLeagueSeasons[0] || '');
            }}
          >
            {leagues.map(league => (
              <option key={league} value={league}>{league}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
          <select 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            {seasons.map(season => (
              <option key={season} value={season}>{season}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <p className="text-sm text-blue-800">Top Score</p>
          <p className="text-2xl font-bold">{Math.max(...filteredData.map(team => team.score))}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <p className="text-sm text-green-800">Teams</p>
          <p className="text-2xl font-bold">{filteredData.length}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg text-center">
          <p className="text-sm text-purple-800">Avg Score</p>
          <p className="text-2xl font-bold">
            {Math.round(filteredData.reduce((sum, team) => sum + team.score, 0) / filteredData.length)}
          </p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <p className="text-sm text-orange-800">Events</p>
          <p className="text-2xl font-bold">
            {new Set(filteredData.flatMap(team => team.events)).size}
          </p>
        </div>
      </div>
      
      {/* Leaderboard Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Losses</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win Rate</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData
              .sort((a, b) => b.score - a.score)
              .map((team, index) => (
                <tr key={team.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={team.profileImage} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{team.name}</div>
                        <div className="text-sm text-gray-500">#{team.number}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.wins}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.losses}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {((team.wins / (team.wins + team.losses)) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardPage;