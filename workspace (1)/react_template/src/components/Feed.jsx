// src/components/Feed.jsx
import React from 'react';
import Post from './Post';

const Feed = () => {
  const fakePost = {
    id: '1',
    author: {
      username: 'robotics_team_2024',
      profilePicture: '/assets/images/team_profile.jpg',
      location: 'World Robotics Championship'
    },
    media: [
      '/assets/images/robotics_post.jpg',
    ],
    caption: "Incredible performance by our team at the championships! 🤖 Proud of everyone's hard work and dedication. #Robotics #Innovation #FIRST",
    likes: 1234,
    comments: [
      { username: 'tech_enthusiast', text: 'Amazing work! 🔥' },
      { username: 'future_engineer', text: 'This is inspiring!' }
    ],
    timestamp: '2 HOURS AGO'
  };

  return (
    <div className="pt-14">
      <div className="max-w-screen-md mx-auto">
        <Post post={fakePost} />
      </div>
    </div>
  );
};

export default Feed;