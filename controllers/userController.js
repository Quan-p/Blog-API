const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const passport = require('passport');
const jwt = require("jsonwebtoken");

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
                const token = jwt.sign({ user: body }, process.env.SECRET, {
                    expiresIn: '1d'
                });
                return res.json({ token });
            })
        } catch(error) {
            return next(error);
        }
    })
}
