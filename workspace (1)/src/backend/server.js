// src/backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tba_community', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const User = mongoose.model('User', new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
  role: String,
}));

const Team = mongoose.model('Team', new mongoose.Schema({
  teamId: String,
  name: String,
  bio: String,
  logo: String,
  members: [String],
}));

const Post = mongoose.model('Post', new mongoose.Schema({
  postId: String,
  author: String,
  team: String,
  media: [String],
  tags: [String],
}));

// Routes
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send(user);
});

app.post('/api/teams', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).send(team);
});

app.post('/api/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).send(post);
});

app.get('/api/feed', async (req, res) => {
  const posts = await Post.find();
  res.status(200).send(posts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});