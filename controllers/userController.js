const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const passport = require('passport');
const jwt = require("jsonwebtoken");

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

exports.login = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('Error has occurred');
                return next(error);
            }
            
            req.login(user, { session: false }, async (error) => {
                if(error) return next(error);

                const body = { _id: user._id, username: user.username };
                
                const token = jwt.sign({ user: body }, 'secretkey', {
                    expiresIn: '1d'
                });
                return res.json({ token, user });
            })
        } catch(error) {
            return next(error);
        }
    })
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}
