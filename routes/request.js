var express = require('express');
var router = express.Router();
var Request = require('../models')("Request");
var User = require('../models')("User");
var ChatRoom = require('../models')("ChatRoom");
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/new', (req, res) => {
  var newRequest = new Request({
    user: req.user._id,
    room: ObjectId(req.body.room),
    date: new Date(),
  });
  newRequest.save().then((requsetAdded, err) => {
    req.user.requests.push(requsetAdded._id);
    req.user.save();
    ChatRoom.findById(req.body.room, (err, currentRoom) => {
       if (err) {
           return;
       } else {
           currentRoom.requests.push(requsetAdded._id);
           currentRoom.save();
               res.json({
          status: 200,
        //   user: req.user,
      });
       }
  });
  }).catch((err) => {
      res.sendStatus(409);
    //   res.json({
    //       status: 409,
    //       user: req.user,
    //   });
  });
});
router.post('/remove', (req, res) => {
    console.log(req.body, ' body')
    req.user.requests.pop(req.body.reqToRoomId);
    req.user.save();
    ChatRoom.findById(req.body.room, (err, currentRoom) => {
        if (err) {
            return;
        } else {
            currentRoom.requests.pop(req.body.reqToRoomId);
            currentRoom.save();
            Request.deleteOne({_id: req.body.reqToRoomId}, (err) => {
                res.json({
                    status: 200,
                });
            });
        }
   });
  });
  router.post('/reject', (req, res) => {
    User.findById(req.body.request.user._id, (err, userReq) => {
        if (err) {
            return;
        } else {
            userReq.requests.pop(req.body.request._id);
            userReq.save();
            ChatRoom.findById(req.body.request.room._id, (err, currentRoom) => {
                if (err) {
                    return;
                } else {
                    currentRoom.requests.pop(req.body.request._id);
                    currentRoom.save();
                    Request.deleteOne({_id: req.body.request._id}, (err) => {
                        res.json({
                            status: 200,
                        });
                    });
                }
           });
        }
    });
  });
router.get('/getAll', (req, res) => {
   Request.find({}).populate('user').populate('room').exec((error, requests) => {
      return res.json({
          status: 200,
          requests,
      });
});
});

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
