var express = require('express');
const passport = require('passport');
var router = express.Router();
var User = require('../models')("User");

router.post('/resetPassword', async function (req, res) {
  User.findOne({ resetPasswordToken: req.body.userToken }, (err, user) => {
    if (err) {
      res.sendStatus(404);
    }
    User.updatePassword(user, req.body.newPassword, () => {
      res.sendStatus(200);
    });
  });
});

router.get('/getUser/:uid', (req, res) => {
  User.findById(req.params.uid, (err, user) => {
    if (err) {
      return res.sendStatus(404);
    }
    return res.json({
      status: 200,
      user,
    });
  });
});

module.exports = router;
