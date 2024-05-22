var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/reg', function(req, res) {
  res.render('reg', { title: 'Register' });
});

router.post('/reg', function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  var passwordRepeat = req.body['password-repeat'];

  if (password !== passwordRepeat) {
    req.flash('error', 'The passwords do not match!');
    return res.redirect('/reg');
  }

  // Generating the MD5 hash of the password
  var md5 = crypto.createHash('md5');
  password = md5.update(req.body.password).digest('hex');

  var newUser = new User({
    name: req.body.name,
    password: password,
    email: req.body.email
  });

  User.get(newUser.name, function(err, user) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }
    if (user) {
      req.flash('error', 'User already exists!');
      return res.redirect('/reg');
    }
    // If the user does not exist, save the new user
    newUser.save(function(err, user) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = user; // Store user information in session
      req.flash('success', 'Registration successful!');
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function(req, res) {
  // Code for handling login data
});

router.get('/post', function(req, res) {
  res.render('post', { title: 'Post' });
});

router.post('/post', function(req, res) {
  // Code for handling post data
});

router.get('/logout', function(req, res) {
  // Code for handling logout
});

module.exports = router;
