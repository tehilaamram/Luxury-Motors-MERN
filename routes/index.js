var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models')("User");
var nodemailer = require('nodemailer');
var waterfall = require('async-waterfall');
const crypto = require('crypto');

var serverEmailAddress = 'buy.a.luxury.vehicle';
var serverEmailPassword = 'tehila1997';

router.post('/signUp', function (req, res) {
  var mykey = crypto.createDecipher('aes-128-cbc', 'luxury');
  var mystr = mykey.update(req.body.password, 'hex', 'utf8');
  mystr += mykey.final('utf8');
  User.register(new User({ username: req.body.username, role: 'user', fullName: req.body.fullName }), req.body.password, function (err, user) {
    if (err) {
      return res.sendStatus(409);
    }
    passport.authenticate('local')(req, res, function () {
      return res.json({
        status: 200,
        user: {
          id: req.user.id,
        }
      });
    });
  });
});
router.post('/signIn', passport.authenticate('local'), (req, res) => {
  setTimeout(() => {
    return res.json({
      status: 200,
      user: {
        id: req.user.id,
        fullName: req.user.fullName,
        role: req.user.role,
      },
    });
  }, 0);
});

router.get('/signOut', function (req, res) {
  req.logout();
  req.session.destroy(function () {
    res.clearCookie('connect.sid');
    res.sendStatus(200);
  });
});

router.post('/resetPassword', async (req, res) => {
  waterfall([
    function (done) {
      crypto.randomBytes(20, (err, buf) => {
        var token = buf.toString('hex');
        console.log(token, ' token')
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ username: req.body.email }).exec().then((user) => {
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        User.collection.updateOne({ username: req.body.email }, user);
        done(null, token, user);
      });

    },
    function (token, user, done) {
      var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: serverEmailAddress,
          pass: serverEmailPassword,
        }
      });
      var mailOptions = {

        to: user.username,
        from: 'Buy a Luxury Vehicle',
        subject: 'Reset Password',
        text: 'Hello ' + user.fullName + '\n\n' +
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.origin + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'

      };
      smtpTrans.sendMail(mailOptions, function (err) {
        console.log('sent')
        if (err) {
          return res.sendStatus(404);
        }
        return res.sendStatus(200);
      });
    }
  ], function (err) {
    if (err) {
      res.redirect('/signup');
    }
    else {
      res.redirect('/login');
    }
  });
  res.redirect('/');
});

router.get('/resetPassword/:token', (req, res) => {
  return User.findOne({ resetPasswordToken: req.params.token }, (err, user) => {
    if (err) {
      console.log(err, 'reset password error');
      return res.sendStatus(404);
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res.sendStatus(419); // expired
    } else {
      return res.json({
        status: 200,
      });
    }
  });
});

module.exports = router;
