// src/components/Feed.jsx
import React from 'react';
import Post from './Post';

const Feed = ({ posts }) => {
  return (
    <div className="p-4">
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default Feed;