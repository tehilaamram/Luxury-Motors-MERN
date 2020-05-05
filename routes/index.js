var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models')("User");
const crypto = require('crypto');

router.get('/', function (req, res, next) {
  res.end();
  // res.render('index', { title: 'Home' });
});
router.post('/signUp', function (req, res, next) {
  // console.log(req.session, ' session in start');
  var mykey = crypto.createDecipher('aes-128-cbc', 'luxury');
  var mystr = mykey.update(req.body.password, 'hex', 'utf8');
  mystr += mykey.final('utf8');
  // console.log('registering user', mystr);
  // req.session.email = req.body.username;
  // console.log(req.session);
  User.register(new User({ email: req.body.email, level: 'user', fullName: req.body.fullName }), mystr, function (err, user) {
    console.log('in', user);
    // console.log(req.session);
    if (err) {
      console.log('error while user register!', err);
      return res.sendStatus(409);
    }
    req.login(user, function(err) {
if (err) {
  return res.sendStatus(err);
}
console.log(req.session);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
return res.sendStatus(200);

    })
    // var authenticate = User.authenticate();
    // authenticate(req.body.email, mystr, function (err, result) {
    //   if (err) {
    //     console.log('error in auth', err);
    //   } else {
    //     console.log(result, ' result', req.session);
    //   }
    // });
  });
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
  res.redirect('/');
});
// router.post('/signIn', )
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

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
 
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

module.exports = router;
