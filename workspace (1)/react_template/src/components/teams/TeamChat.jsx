import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { teamsData } from '../../data/teamsData';

const TeamChat = () => {
  const { teamId } = useParams();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  
  const team = teamsData.find(t => t.id === parseInt(teamId));
  
  if (!team) {
    return (
      <div className="pt-20 px-4 pb-20 flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-red-500">Team not found!</p>
        <Link to="/teams" className="mt-4 text-blue-600 hover:underline">
          Back to teams list
        </Link>
      </div>
    );
  }
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate team response after a short delay
    setTimeout(() => {
      const teamResponse = {
        id: Date.now() + 1,
        sender: 'team',
        text: getRandomResponse(team),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, teamResponse]);
    }, 1000);
  };
  
  const getRandomResponse = (team) => {
    const responses = [
      `Thanks for reaching out! We're excited to connect with other teams in the ${team.category} community.`,
      `Hello from Team ${team.number}! How can we help you today?`,
      `We're currently ${team.mentorshipStatus === 'offering' ? 'mentoring several teams' : 'looking for mentorship'}. What specific areas are you interested in?`,
      `Our team specializes in robot design and programming. What aspects of robotics is your team focusing on?`,
      `We'd be happy to share our experience from the ${team.achievements.join(', ')} competitions!`,
      `Would you like to schedule a virtual meeting with our team members to discuss collaboration opportunities?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="pt-20 pb-20 flex flex-col h-screen max-w-screen-md mx-auto px-4">
      {/* Header */}
      <div className="flex items-center border-b pb-4">
        <Link to="/teams" className="mr-4 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img 
            src={team.profileImage} 
            alt={`${team.name} logo`}
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <h2 className="font-bold">{team.name} #{team.number}</h2>
          <p className="text-sm text-gray-600">{team.category} · {team.location}</p>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {/* Welcome message */}
        {chatHistory.length === 0 && (
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
              <p className="text-center text-gray-600">
                This is the beginning of your conversation with {team.name}.
              </p>
            </div>
          </div>
        )}
        
        {/* Chat messages */}
        {chatHistory.map(msg => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs rounded-lg px-4 py-2 ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'} text-right`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="border-t pt-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            type="submit"
            disabled={!message.trim()}
            className={`ml-2 rounded-full p-2 ${
              message.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamChat;