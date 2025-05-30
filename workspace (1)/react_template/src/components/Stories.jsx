// src/components/Stories.jsx
import React from 'react';

const Stories = () => {
  const stories = [
    { id: 1, username: 'john_doe', image: '/assets/images/story1.jpg' },
    { id: 2, username: 'robotics_team', image: '/assets/images/story2.jpg' },
  ];

  return (
    <div className="bg-white border-b overflow-x-auto">
      <div className="flex p-4 space-x-4">
        {stories.map(story => (
          <div key={story.id} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full ring-2 ring-pink-500 p-0.5">
              <img
                src={story.image}
                alt={story.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs mt-1 truncate w-16 text-center">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;