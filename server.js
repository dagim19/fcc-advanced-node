'use strict';
require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const passport = require('passport');
const session = require('express-session');
const app = express();
require('mongodb').ObjectID;


fccTesting(app); //For FCC testing purposes
app.set('view engine', 'pug');
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser((id, done) => {
  done(null, null);
})

app.route('/').get((req, res) => {
  res.render(process.cwd() + '/views/pug/index', { title: 'Hello', message: 'Please login' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
