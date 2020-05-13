var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models')("User");
var nodemailer = require('nodemailer');
var waterfall = require('async-waterfall');
const crypto = require('crypto');

var serverEmailAddress = 'buy.a.luxury.vehicle';
var serverEmailPassword = 'tehila1997';

router.post('/signUp', function (req, res, next) {
  var mykey = crypto.createDecipher('aes-128-cbc', 'luxury');
  var mystr = mykey.update(req.body.password, 'hex', 'utf8');
  mystr += mykey.final('utf8');
  User.register(new User({ email: req.body.email, role: 'user', fullName: req.body.fullName }), mystr, function (err, user) {
    console.log('in', user);
    if (err) {
      return res.sendStatus(409);
    }
    req.login(user, function (err) {
      if (err) {
        return res.sendStatus(err);
      }
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
  req.login(req.body.user, function (err) {
    if (err) {
      return res.sendStatus(err);
    }
    return User.find({email: req.user.email}).then((fuser) => {
      return res.json({
        status: 200,
        user: {
          id: fuser[0].id,
          fullName: fuser[0].fullName,
          role: fuser[0].role,
        }
      });
    });
  });
});

router.get('/signOut', function (req, res) {
  console.log(req.session, ' req');
  req.logout();
  return res.sendStatus(200);
});

router.post('/resetPassword', async (req, res) => {
  waterfall([
    function(done) {
      crypto.randomBytes(20, (err, buf) => {
        var token = buf.toString('hex');
        console.log(token, ' token')
        done(err, token);
      });
    },
    function(token, done) {
     User.findOne({email: req.body.email}).exec().then((user) => {
       console.log(user, ' user reset');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        console.log(user, ' user')
        User.collection.updateOne({email: req.body.email}, user);
        console.log(user, ' save error')
        user.save((err) => {
          console.log(err, ' err save')
          done(err, token, user);
        });
     });

    },
    function(token, user, done) {
      console.log('email things')
      var smtpTrans = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
         user: serverEmailAddress,
         pass: serverEmailPassword,
       }
     });
     var mailOptions = {

       to: user.email,
       from: 'Buy a Luxury Vehicle',
       subject: 'Reset Password',
       text:          'Hello ' + user.fullName + '\n\n' +
       'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
         'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
         'http://' + req.headers.origin + '/reset/' + token + '\n\n' +
         'If you did not request this, please ignore this email and your password will remain unchanged.\n'

     };
     console.log('step 3')
       smtpTrans.sendMail(mailOptions, function(err) {
       req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
       console.log('sent')
       if (err) {
         return res.sendStatus(404);
       }
       return res.sendStatus(200);
      //  res.redirect('/forgot');
});
    }
  ], function(err) {
    if (err) {
       res.redirect('/signup');
   }
    else{
      res.redirect('/login');
    }
  });
  res.redirect('/');
});

module.exports = router;
