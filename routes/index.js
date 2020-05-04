var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models')("User");
const crypto = require('crypto');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});
router.post('/signUp', function (req, res, next) {
var mykey = crypto.createDecipher('aes-128-cbc', 'luxury');
var mystr = mykey.update(req.body.password, 'hex', 'utf8')
mystr += mykey.final('utf8');
  console.log('registering user', mystr);
  User.register(new User({ username: req.body.username, level: 'user', fullName: req.body.fullName }), mystr, function (err) {
    console.log('in');
    if (err) {
      console.log('error while user register!', err);
      return res.sendStatus(409);
    }
    console.log('user registered!');
    res.redirect('/');
  });
});

// GET /logout
router.get('/signOut', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function (req, res) {
  res.redirect('/');
});
module.exports = router;
