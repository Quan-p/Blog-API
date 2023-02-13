const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

exports.signup = [
    body('username', 'Empty username')
    .trim()
    .escape()
    .custom(async (username) => {
        try {
            const existingUser = await User.findOne({ username: username });
            if (existingUser) throw new Error('Username already exists')
        } catch(error) {
            throw new Error(error);
        }
    }),
    body('password').isLength(6).withMessage('Minimum length is 6 characters'),
    body('confirm-password').custom((value, { req }) => {
        if(value !== req.body.password) {
            return next('Passwords do not match');
        }
        // Success
        return true;
    }),
    async (req, res, next) => {
        passport.authenticate('signup', { session: false }, (err, user, info) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    username: req.body.username,
                    errors: errors.array(),
                });
            }
            if (err) return next(err);
            res.json({
                message: 'Sign up successful',
                user: req.user,
            });
        })(req, res, next);
    }
];

exports.get_single_user = async function(req, res, next) {
    try {
        const user = await User.findById(req.params.userid);
        if (!user) return res.status(404).json({ err: `User with id ${req.params.id} not found` });
        res.status(200).json({ user });
    } catch (err) {
        next(err)
    }
};

exports.login = function (req, res) {
    passport.authenticate('login', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: "Incorrect Username or Password",
                user,
            });
        }
        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.SECRET_KEY);
        
        if (err) return res.status(400).json(err);
        res.json({ token, body });
    })(req, res);
  };

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}
