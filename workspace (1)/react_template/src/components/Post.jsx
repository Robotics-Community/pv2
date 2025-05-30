// src/components/Post.jsx
import React from 'react';

const Post = ({ post }) => {
  return (
    <article className="bg-white border-b mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={post.author.profilePicture}
              alt={post.author.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <span className="text-sm font-semibold">{post.author.username}</span>
            <div className="text-xs text-gray-500">{post.author.location}</div>
          </div>
        </div>
        <button className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>

      {/* Post Image */}
      <div className="relative">
        {post.media.map((mediaUrl, index) => (
          <img
            key={index}
            src={mediaUrl}
            alt="Post content"
            className="w-full"
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-2">{post.likes.toLocaleString()} likes</div>

        {/* Caption */}
        <div className="text-sm mb-2">
          <span className="font-semibold mr-2">{post.author.username}</span>
          {post.caption}
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="text-sm text-gray-500 mb-1">
            View all {post.comments.length} comments
          </div>
        )}
        {post.comments.slice(0, 2).map((comment, index) => (
          <div key={index} className="text-sm mb-1">
            <span className="font-semibold mr-2">{comment.username}</span>
            {comment.text}
          </div>
        ))}

        {/* Timestamp */}
        <div className="text-xs text-gray-500 uppercase mt-2">
          {post.timestamp}
        </div>
      </div>

      {/* Add Comment */}
      <div className="flex items-center border-t p-3">
        <button className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 text-sm outline-none"
        />
        <button className="ml-4 text-blue-500 font-semibold text-sm">Post</button>
      </div>
    </article>
  );
};

export default Post;