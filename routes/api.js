const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');
const user_controller = require('../controllers/userController');
const comment_controller = require('../controllers/commentController');
const passport = require('passport');

router.get('/', (req, res) => {
  return res.send('Received a GET HTTP Method');
});

// get all posts
router.get('/posts', post_controller.get_posts);

// get post by ID
router.get('/posts/:postid', post_controller.get_single_post);

// get all users
router.get('/users', user_controller.get_users);

// get user by ID
router.get('/users/:userid', user_controller.get_single_user);

// get all comments for a post
router.get('/posts/:postid/comments', comment_controller.get_comments);

// get single comment for a post
router.get('/posts/:postid/comments/:commentid', comment_controller.get_single_comment)

// Create a post
router.post('/posts', passport.authenticate('jwt', { session: false }), post_controller.create_post);

// Create a comment
router.post('/posts/:postid/comment', comment_controller.create_comment);

// Update a post
router.put('/posts/:postid', passport.authenticate('jwt', { session: false }), post_controller.update_post);

// delete a post
router.delete('/posts/:postid', passport.authenticate('jwt', { session: false }), post_controller.delete_post);

// delete a commnet
router.delete('/posts/:postid/comments/:commentid', passport.authenticate('jwt', { session: false }), comment_controller.delete_comment);

// Admin signup
router.post('/sign-up', user_controller.signup);

// Login
router.post('/login', user_controller.login);

router.get('/logout', user_controller.logout);

module.exports = router;
