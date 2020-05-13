var express = require('express');
const passport = require('passport');
var router = express.Router();
var User = require('../models')("User");

router.post('/resetPassword', async function(req, res) {
      User.findOne({resetPasswordToken: req.body.userToken},(err, user) => {
        console.log(user, ' really?')
        if (user) {
          const user = new User({username: req.body.email});
           user.setPassword('password').then(() => {
            user.save().then(() => {

            });

           });
        } else {
          res.sendStatus(404);
        }    
  });
});
module.exports = router;

