var express = require('express');
var router = express.Router();
var User = require('../models')("User");
const { ensureAuthenticated, ensureAdminAuthenticated } = require('./middleware');

router.post('/resetPassword', async function (req, res) {
  User.findOne({ resetPasswordToken: req.body.userToken }, (err, user) => {
    if (err) {
      res.sendStatus(404);
    }
    User.updatePassword(user, req.body.newPassword, () => {
      User.findOneAndUpdate({ resetPasswordToken: req.body.userToken }, { resetPasswordExpires: Date.now() }, { new: true }, function (err, doc) {
        if (err) {
            res.sendStatus(400);
        }
    });      res.sendStatus(200);
    });
  });
});

router.get('/getUser/:uid',ensureAuthenticated, (req, res) => {
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

router.get('/getAll', ensureAdminAuthenticated,(req, res) => {
  return User.find({}).then((users) => {
    res.send(users);
  });
});

router.post('/update', ensureAdminAuthenticated, function (req, res) {
  User.findOneAndUpdate({ username: req.body.user.username }, req.body.user, { new: true }, function(err, doc) {
    if(err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
  // User.findOne({ resetPasswordToken: req.body.userToken }, (err, user) => {
  //   if (err) {
  //     res.sendStatus(404);
  //   }
  // });
});

module.exports = router;
