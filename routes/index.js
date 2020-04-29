var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models')("User");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.post('/register', async (req, res) => {
  User.findOne({ email:  req.body.email }).then((user) => {
    console.log('in user');
    if (user) {
      return res.send(409); // 409 conflict
    } else {
      const newUser = new User({
          email : req.body.email,
          password: req.body.password,
          username: req.body.email,
          fullName: req.body.fullName,
        orders: [],
      cart: [],
      wishList: [],
      status:true,
      });
       console.log('oihfe');
      newUser.save().then(user => {
        passport.authenticate('local')(req, res, function () {
          var session = req.session;
          delete session.badLogin;
          req.session.userId = req.body.email;
          session.admin = false;
          // session.userName = req.body.name;
          session.count = 0;
          req.session = session;
          res.redirect(req.session.referer);
      });
      })
      .catch(err => console.log(err));
    }
  }).catch(err => console.log(err));
});

module.exports = router;
