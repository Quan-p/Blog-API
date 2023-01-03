const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');
// 
router.get('/', (req, res) => {
  return res.send('Received a GET HTTP Method');
});

// get all posts
router.get('/posts', post_controller.get_posts);

// get post by ID
router.get('/posts/:postid', post_controller.get_single_post);

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
router.delete('/posts/:id', (req, res) => {
  return res.send('Received a DELETE HTTP method to delete a post');
});
// delete a commnet
router.delete('/posts/:postid/comment/:commentid', (req, res) => {
  return res.send('Received a DELETE HTTP method to delete a post');
});

module.exports = router;
