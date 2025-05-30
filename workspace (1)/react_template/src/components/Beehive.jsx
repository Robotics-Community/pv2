// src/components/Beehive.jsx
import React, { useState, useRef } from 'react';
import { beehiveData } from '../data/beehiveData';

const Beehive = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef([]);

  const handleVideoToggle = (index) => {
    // Create a new state object to avoid state mutation
    const newIsPlaying = { ...isPlaying };
    
    // If the video is currently playing, pause it
    if (newIsPlaying[index]) {
      videoRefs.current[index].pause();
      newIsPlaying[index] = false;
    } else {
      // Pause all videos first
      Object.keys(newIsPlaying).forEach(key => {
        if (newIsPlaying[key] && videoRefs.current[key]) {
          videoRefs.current[key].pause();
          newIsPlaying[key] = false;
        }
      });
      
      // Play the selected video
      videoRefs.current[index].play();
      newIsPlaying[index] = true;
    }
    
    setIsPlaying(newIsPlaying);
  };

  const handleScroll = (direction) => {
    if (direction === 'next' && currentIndex < beehiveData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // Reset playing state when navigating
      setIsPlaying({});
    } else if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      // Reset playing state when navigating
      setIsPlaying({});
    }
  };

  return (
    <div className="pt-14 bg-black min-h-screen">
      <div className="text-white py-4 px-4 text-center">
        <h1 className="text-2xl font-bold">Beehive</h1>
        <p className="text-sm text-gray-300">Explore robot matches, reveals & tutorials</p>
      </div>
      
      <div className="relative h-[calc(100vh-8rem)] max-w-md mx-auto">
        {/* Video player */}
        <div className="h-full w-full overflow-hidden relative">
          {beehiveData.map((video, index) => (
            <div 
              key={video.id} 
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 -z-10'
              }`}
            >
              <div className="relative h-full">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.videoUrl}
                  className="h-full w-full object-cover"
                  loop
                  onClick={() => handleVideoToggle(index)}
                  poster={video.thumbnailUrl}
                />
                
                {/* Play/Pause overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={() => handleVideoToggle(index)}
                >
                  {!isPlaying[index] && (
                    <div className="bg-black bg-opacity-40 rounded-full p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Video info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center mb-2">
                    <img 
                      src={video.user.profilePicture} 
                      alt={video.user.username} 
                      className="w-8 h-8 rounded-full object-cover mr-2 border border-white"
                    />
                    <span className="text-white font-semibold">{video.user.username}</span>
                    <button className="ml-auto bg-white text-black px-2 py-1 rounded-md text-sm font-medium">Follow</button>
                  </div>
                  <p className="text-white text-sm mb-2">{video.caption}</p>
                  <div className="flex text-white text-xs">
                    <span>{video.views} views</span>
                    <span className="mx-2">•</span>
                    <span>{video.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        <button 
          className={`absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}`}
          onClick={() => handleScroll('prev')}
          disabled={currentIndex === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 ${currentIndex === beehiveData.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}`}
          onClick={() => handleScroll('next')}
          disabled={currentIndex === beehiveData.length - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Interactive elements */}
        <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-white text-xs block">{beehiveData[currentIndex]?.likes}</span>
          </button>
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-white text-xs block">{beehiveData[currentIndex]?.comments.length}</span>
          </button>
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-white text-xs block">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Beehive;