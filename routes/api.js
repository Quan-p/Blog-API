const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');
// 
router.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
// get all posts
router.get('/posts', (req, res) => {
  return res.send('GET HTTP method for all posts');
});
// get post by ID
router.get('/posts/:id', (req, res) => {
  return res.send('GET HTTP method for specific post');
});
// get all comments for a post
router.get('/posts/:postid/comments', (req, res) => {
  return res.send('GET HTTP method for all comments');
});
// login
router.post('/login', (req, res) => {
  return res.send('Received a POST HTTP method to login');
});

// logout
router.post('/logout', (req, res) => {
  return res.send('Received a POST HTTP method to logout');
});
// Create a post
router.post('/posts', post_controller.create_post);

// Create a comment
router.post('/posts/:postid/comment', (req, res) => {
  return res.send('Received a POST HTTP method to create a comment');
});
// Update a post
router.put('/post:id', (req, res) => {
  return res.send('Received a PUT HTTP method to update a post');
});
// delete a post
router.delete('/post/:id', (req, res) => {
  return res.send('Received a DELETE HTTP method to delete a post');
});
// delete a commnet
router.delete('/post/:postid/comment/:commentid', (req, res) => {
  return res.send('Received a DELETE HTTP method to delete a post');
});

module.exports = router;
