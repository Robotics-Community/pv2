// src/api/index.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const createUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};

export const createTeam = async (teamData) => {
  const response = await axios.post(`${API_BASE_URL}/teams`, teamData);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData);
  return response.data;
};

export const getFeed = async () => {
  const response = await axios.get(`${API_BASE_URL}/feed`);
  return response.data;
};