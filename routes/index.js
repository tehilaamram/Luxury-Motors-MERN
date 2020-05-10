var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models')("User");
const crypto = require('crypto');

// router.get('/', function (req, res, next) {
//   res.end();
//   // res.render('index', { title: 'Home' });
// });
router.post('/signUp', function (req, res, next) {
  var mykey = crypto.createDecipher('aes-128-cbc', 'luxury');
  var mystr = mykey.update(req.body.password, 'hex', 'utf8');
  mystr += mykey.final('utf8');
  User.register(new User({ email: req.body.email, role: 'user', fullName: req.body.fullName }), mystr, function (err, user) {
    console.log('in', user);
    // console.log(req.session);
    if (err) {
      console.log('error while user register!', err);
      return res.sendStatus(409);
    }
    req.login(user, function (err) {
      if (err) {
        return res.sendStatus(err);
      }
      // console.log(req.user);
      return res.json({
        status: 200,
        user: {
          id: req.user.id,
        }
      });

    });
  });
});
router.post('/signIn', function (req, res) {
  var mykey = crypto.createDecipher('aes-128-cbc', 'luxury');
  var mystr = mykey.update(req.body.user.password, 'hex', 'utf8');
  mystr += mykey.final('utf8');
  req.body.user.password = mystr;
    console.log(req.body.user);
  req.login(req.body.user, function (err) {
    console.log('in login', err);
    if (err) {
      return res.sendStatus(err);
    }
    console.log(req.user);
    // User.findById(id, function (err, user) {
    //   done(err, user);
    // });
    return User.find({email: req.user.email}).then((fuser) => {
      console.log(fuser[0].id, ' usersd');
      return res.json({
        status: 200,
        user: {
          // t: 'ere',
          id: fuser[0].id,
          fullName: fuser[0].fullName,
          role: fuser[0].role,
        }
      });
    });
  

  })  // res.redirect('/');
});
// router.post('/signIn', )
// GET /logout
// router.get('/signOut', function (req, res, next) {
//   if (req.session) {
//     // delete session object
//     req.session.destroy(function (err) {
//       if (err) {
//         return next(err);
//       } else {
//         return res.redirect('/');
//       }
//     });
//   }
// });

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function (req, res) {
  res.redirect('/');
});

router.get('/signOut', function (req, res) {
  console.log(req.session, ' req');
  req.logout();
  return res.sendStatus(200);

  // console.log(req.session, ' req');
  // res.redirect('/');
});

module.exports = router;
