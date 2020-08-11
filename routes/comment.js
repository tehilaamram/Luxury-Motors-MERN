var express = require('express');
// var multer = require('multer');
// let fs = require("fs");
var router = express.Router();
var Comment = require('../models')("Comment");
var Vehicle = require('../models')("Vehicle");
var ObjectId = require('mongoose').Types.ObjectId;
const { ensureAuthenticated } = require('./middleware');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploadedImages');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// })

// var upload = multer({ storage: storage })
router.post('/new', ensureAuthenticated, (req, res) => {
    // console.log(req.user);
    var newComment = new Comment({
        date: new Date(),
        user: req.user._id,
        vehicle: req.body.vehicle,
        rate: req.body.rate,
        text: req.body.text,
    });
    newComment.save().then((savedComment) => {
        Vehicle.findById(req.body.vehicle, (err, vehicleToUpdate) => {
            vehicleToUpdate.comments.push(savedComment._id);
            vehicleToUpdate.save();
            res.sendStatus(200);
        });
    });
    // if (req.isAuthenticated() && req.user.role === 'admin') {
    //     console.log(req.user, ' user req');
    //     var img = fs.readFileSync(req.files[0].path);
    //     var encode_image = img.toString('base64');
    //     // Define a JSONobject for the image attributes for saving to database
    //     var finalImg = {
    //         contentType: req.files[0].mimetype,
    //         image: new Buffer(encode_image, 'base64')
    //     };
    //     var newRoom = new ChatRoom({
    //         img: finalImg,
    //         name: req.body.name,
    //     });
    //     newRoom.members.push(req.user._id);
    //     newRoom.save().then((room) => {
    //         req.user.rooms.push(room._id);
    //         req.user.save();
    //         res.json({
    //             status: 200,
    //         });
    //     });
    // } else {
    //     res.json({
    //         status: 101,
    //     });
    // }
   
});

router.get('/getAll', (req, res) => {
    return ChatRoom.find({}).then((rooms) => {
        res.send(rooms);
    });
});

router.get('/getUserRooms/:id', (req, res) => {
    ChatRoom.find({ _id: { $in: req.user.rooms } }, (err, list) => {
        return res.json({
            status: 200,
            list,
        });
    });
    // ChatRoom.findById(req.params.id, (err, vehicle) => {
    //     if (err) {
    //         return res.sendStatus(404);
    //     }
    //     return res.json({
    //         status: 200,
    //         vehicle,
    //     });
    // });
});

router.get('/getRoomsToJoin', (req, res) => {
    // console.log('in get by id', JSON.parse(req.query.params));
    // var userRoomList = req.user.rooms;
    // var idJson = JSON.parse(req.query.params);
    // var obj_ids = idJson.vid.map(function (element) { return ObjectId(element.vehicle); });
    ChatRoom.find({_id: { $nin: req.user.rooms }}).populate({ path: 'requests', match: {user: req.user._id}}).exec((err, list) => {
        return res.json({
            status: 200,
            list,
        });      });
    // ChatRoom.find({ _id: { $nin: req.user.rooms } }, (err, list) => {
    //     return res.json({
    //         status: 200,
    //         list,
    //     });
    // });
});

module.exports = router;
