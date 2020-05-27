var express = require('express');
var multer = require('multer');
let fs = require("fs");
var router = express.Router();
var Room = require('../models')("Room");
var ObjectId = require('mongoose').Types.ObjectId;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadedImages');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

var upload = multer({ storage: storage })
router.post('/addRoom', upload.array('file', 1), (req, res) => {
    //   console.log(req.files);
    //   var additionalImagesList = [];
    //   for (var i =1; i < req.files.length; i++) {
    //     var img = fs.readFileSync(req.files[i].path);
    //     var encode_image = img.toString('base64');
    //     // Define a JSONobject for the image attributes for saving to database
    //     var finalImg = {
    //       contentType: req.files[i].mimetype,
    //       image: new Buffer(encode_image, 'base64')
    //     };
    //     additionalImagesList.push(finalImg);
    //   }
    //   console.log('in add vehicle');
    var img = fs.readFileSync(req.files[0].path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
    var finalImg = {
        contentType: req.files[0].mimetype,
        image: new Buffer(encode_image, 'base64')
    };
    var newRoom = new Room({
        img: finalImg,
        name: req.body.name,
        numMembers: req.body.numMembers,
    });
    newRoom.save().then((room) => {
        res.json({
            status: 200,
            // id: vehicle.id,
        });
    });
});

router.get('/getAll', (req, res) => {
    return Room.find({}).then((rooms) => {
        res.send(rooms);
    });
});

// router.get('/getVehicle/:id', (req, res) => {
//     Vehicle.findById(req.params.id, (err, vehicle) => {
//         if (err) {
//             return res.sendStatus(404);
//         }
//         return res.json({
//             status: 200,
//             vehicle,
//         });
//     });
// });

// router.get('/getVehiclesById/', (req, res) => {
//     // console.log('in get by id', JSON.parse(req.query.params));
//     var idJson = JSON.parse(req.query.params);
//     var obj_ids = idJson.vid.map(function (element) { return ObjectId(element.vehicle); });
//     Vehicle.find({ _id: { $in: obj_ids } }, (err, list) => {
//         return res.json({
//             status: 200,
//             list,
//         });
//     })
// });

module.exports = router;
