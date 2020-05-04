var express = require('express');
const passport = require('passport');
var router = express.Router();
var User = require('../models')("User");

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });
router.get('/getUser', (req, res) => {
  User.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
  });
});
router.post('/userLogin', (req, res) => {
  const { email, password } = req.body;

  User.find({email: email, password: password}, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      // data.forEach((user)=>{
      //     if(user.password===password&&user.email===email) {
      //         return res.json({success: true, data: user});
      //     }
      // });
      return res.json({ success: true, data: data });
  });
});

router.post('/updateUser', (req, res) => {
  const { id, update } = req.body;
  User.findByIdAndUpdate(id, update, (err) => {
      console.log(id);
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
  });
});

router.delete('/deleteUser', (req, res) => {
  const { id } = req.body;
  User.findByIdAndRemove(id, (err) => {
      if (err) return res.send(err);
      return res.json({ success: true });
  });
});
router.post('/putUser', (req, res) => {
    let data = new User();
    const { email, password, fullName,level} = req.body;
    data.level=level;
    data.email = email;
    data.password = password;
    data.fullName = fullName;
    data.cart = [];
    data.wishList = [];
    data.status = true;
    console.log(data);
    data.save((err) => {
        console.log(err);
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.post('/putClient', (req, res) => {
    let data = new User();
    const { email, password, fullName} = req.body;
    data.level='Client';
    data.email = email;
    data.password = password;
    data.fullName = fullName;
    data.orders = [];
    data.cart = [];
    data.wishList = [];
    data.status = true;
    console.log(data);
    data.save((err) => {
        console.log(err);
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;

