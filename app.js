require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const apiRouter = require('./routes/api');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", apiRouter);

// Import User model
const User = require('./models/user');

passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
  },
  async (username, password, cb) => {
    try {
      const user = await User.findOne({ username });

      if(!user) {
        return done(null, false, { message: 'User not found' });
      }
      const validate = await user.isValidPAssword(password);

      if(!validate) {
        return done(null, false, { message: 'Wrong Password' });
      }

      return done(null, user, { message: 'Log In Successful' });
    } catch (error) {
      return done(error);
    }
  }
))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jwt_secret'
  // replace secret with key from env
},
  async(token, cb) => {
    try {
      return cb(null, token.user);
    } catch (error) {
      cb(error);
    }
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(session({ secret: "secretpassword", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once('connected', () => {
  console.log('Database Connected');
})
app.listen(5000, () => console.log('Listening on http://localhost:5000/'));



module.exports = app;
