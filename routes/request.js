var express = require('express');
var router = express.Router();
var Request = require('../models')("Request");
var ChatRoom = require('../models')("ChatRoom");
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/new', (req, res) => {
  var newRequest = new Request({
    user: req.user._id,
    room: req.body.room,
    date: new Date(),
  });
  newRequest.save().then((requsetAdded, err) => {
    req.user.requests.push(requsetAdded._id);
    req.user.save();
    res.json({
      status: 200,
  });
  }).catch((err) => {
      res.sendStatus(409);
    //   res.json({
    //       status: 409,
    //       user: req.user,
    //   });
  });
});

// router.get('/getAll', (req, res) => {
//   return Vehicle.find({}).then((vehicles) => {
//     res.send(vehicles);
//   });
// });

// router.get('/getVehicle/:id', (req, res) => {
//   Vehicle.findById(req.params.id, (err, vehicle) => {
//     if (err) {
//       return res.sendStatus(404);
//     }
//     return res.json({
//       status: 200,
//       vehicle,
//     });
//   });
// });

// router.get('/getVehiclesById/', (req, res) => {
// // console.log('in get by id', JSON.parse(req.query.params));
// var idJson = JSON.parse(req.query.params);
// var obj_ids = idJson.vid.map(function(element) { return ObjectId(element.vehicle); });
// Vehicle.find({_id: {$in: obj_ids}}, (err, list) => {
//   return res.json({
//     status: 200,
//     list,
//   });})
// });

module.exports = router;
