// src/components/User.jsx
import React, { useState } from 'react';

const User = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save user data logic here
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white max-w-sm mx-auto">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <button onClick={handleSave} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
            Save
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold">{userData.name}</h2>
          <button onClick={handleEdit} className="mt-2 bg-gray-500 text-white p-2 rounded w-full">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default User;