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
  console.log(req.sessionID, ' session id');
  console.log(req.isAuthenticated(), ' auth');
  var mykey = crypto.createDecipher('aes-128-cbc', 'luxury');
  var mystr = mykey.update(req.body.password, 'hex', 'utf8');
  mystr += mykey.final('utf8');
  User.register(new User({ username: req.body.username, role: 'user', fullName: req.body.fullName}), req.body.password, function (err, user) {
    console.log('in', user);
    if (err) {
      console.log(err);
      return res.sendStatus(409);
    }
    console.log('req session befor login', req.session);
    passport.authenticate('local')(req, res, function () {
      // res.redirect('/');
      console.log('in here', req.user);
    return res.json({
        status: 200,
        user: {
          id: req.user.id,
        }
      });
    });
    // req.login(user, function (err) {
    //   if (err) {
    //     return res.sendStatus(err);
    //   }
    //   console.log('req session after login', req.session);
    //   return res.json({
    //     status: 200,
    //     user: {
    //       id: req.user.id,
    //     }
    //   });
    // });
  });
});
router.post('/signIn', passport.authenticate('local'), (req, res) => {
  console.log('in')
  // res.setHeader ("Access-Control-Allow-Origin", "http://localhost:3000"); //front-end domain name
  // console.log(req.session, ' in sign in');
  // res.setHeader('Access-Control-Allow-Credentials' , true);
  // res.header("Access-Control-Allow-Origin", 'http://app.com:4000');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      // req.setHeader('withCredentials' , "true");
      // res.cookie('userid', req.user.id, { maxAge: 2592000000 });  // Expires in one month
    // console.log(req.headers, ' sign in')
       return res.json({
        status: 200,
        user: {
          id: req.user.id,
          fullName: req.user.fullName,
          role: req.user.role,
        },
        // withCredentials: true,
      });
});

router.get('/signOut', function (req, res) {
  // console.log(req.user);
  console.log(req.isAuthenticated(), req.user, ' req out');
  req.logout();
  console.log(req.isAuthenticated(), ' req after out');
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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
     User.findOne({username: req.body.email}).exec().then((user) => {
       console.log(user, ' user reset');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        console.log(user, ' user')
        User.collection.updateOne({username: req.body.email}, user);
        // console.log(user, ' save error')
        // user.save((err) => {
        //   console.log(err, ' err save')
          done(null, token, user);
        // });
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

       to: user.username,
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
      //  req.flash('success', 'An e-mail has been sent to ' + user.username + ' with further instructions.');
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

router.get('/resetPassword/:token', (req, res) => {
  // console.log(req, ' req');
  return User.findOne({resetPasswordToken: req.params.token}, (err, user) => {
    if (err) {
      console.log(err, 'reset password error');
      return res.sendStatus(404);
    }
    // return res.sendStatus(404);

    if (user.resetPasswordExpires < Date.now()) {
      return res.sendStatus(419); // expired
      // req.route.path = '/catalog';
      // next();
      // res.render('/catalog');
    } else {
      return res.json({
        status: 200,
      });
    }
  });
});

module.exports = router;
