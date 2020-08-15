var express = require('express');
var router = express.Router();
var Request = require('../models')("Request");
var User = require('../models')("User");
var ChatRoom = require('../models')("ChatRoom");
const { ensureAuthenticated, ensureAdminAuthenticated } = require('./middleware');

router.post('/new',ensureAuthenticated, (req, res) => {
    var newRequest = new Request({
        user: req.user._id,
        room: req.body.room,
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
                });
            }
        });
    }).catch((err) => {
        res.sendStatus(409);
    });
});
router.post('/remove', ensureAuthenticated, (req, res) => {
    req.user.requests.pop(req.body.reqToRoomId);
    req.user.save();
    ChatRoom.findById(req.body.room, (err, currentRoom) => {
        if (err) {
            return;
        } else {
            currentRoom.requests.pop(req.body.reqToRoomId);
            currentRoom.save();
            Request.deleteOne({ _id: req.body.reqToRoomId }, (err) => {
                res.json({
                    status: 200,
                });
            });
        }
    });
});
router.post('/reject',ensureAdminAuthenticated, (req, res) => {
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
                    Request.deleteOne({ _id: req.body.request._id }, (err) => {
                        res.json({
                            status: 200,
                        });
                    });
                }
            });
        }
    });
});
router.post('/accept', ensureAdminAuthenticated, (req, res) => {
    User.findById(req.body.request.user._id, (err, userReq) => {
        if (err) {
            return;
        } else {
            userReq.requests.pop(req.body.request._id);
            userReq.rooms.push(req.body.request.room._id);
            userReq.save();
            ChatRoom.findById(req.body.request.room._id, (err, currentRoom) => {
                if (err) {
                    return;
                } else {
                    currentRoom.requests.pop(req.body.request._id);
                    currentRoom.members.push(userReq._id);
                    currentRoom.save();
                    Request.deleteOne({ _id: req.body.request._id }, (err) => {
                        res.json({
                            status: 200,
                        });
                    });
                }
            });
        }
    });
});
router.get('/getAll', ensureAdminAuthenticated, (req, res) => {
    Request.find({}).populate('user').populate('room').exec((error, requests) => {
        return res.json({
            status: 200,
            requests,
        });
    });
});

module.exports = router;
