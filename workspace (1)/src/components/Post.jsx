// src/components/Post.jsx
import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold">{post.author.name}</h3>
      <p>{post.team.name}</p>
      <div className="mt-2">
        {post.media.map((mediaUrl, index) => (
          <img key={index} src={mediaUrl} alt="Post media" className="w-full h-auto rounded" />
        ))}
      </div>
      <div className="mt-2">
        {post.tags.map((tag, index) => (
          <span key={index} className="text-sm bg-gray-200 p-1 rounded mr-1">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Post;