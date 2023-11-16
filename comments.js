// Create web server
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();

// Middleware
app.use(bodyParser.json());

// Store comments
const commentsByPostId = {};

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { postId } = req.params;
  const { content } = req.body;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
});

// Create web server
const port = 4001;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Comments service listening on port ${port}`);
});