let express = require('express');
let multer = require('multer');
let fs = require("fs");
let router = express.Router();
let ChatRoom = require('../models')("ChatRoom");
const { ensureAuthenticated, ensureAdminAuthenticated } = require('./middleware');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadedImages');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

let upload = multer({ storage: storage })
router.post('/addRoom', [ensureAdminAuthenticated, upload.array('file', 1)], (req, res) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        let img = fs.readFileSync(req.files[0].path);
        let encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database
        let finalImg = {
            contentType: req.files[0].mimetype,
            image: new Buffer(encode_image, 'base64')
        };
        let newRoom = new ChatRoom({
            img: finalImg,
            name: req.body.name,
        });
        newRoom.members.push(req.user._id);
        newRoom.save().then((room) => {
            req.user.rooms.push(room._id);
            req.user.save();
            res.json({
                status: 200,
            });
        });
    } else {
        res.json({
            status: 101,
        });
    }

});

router.get('/getAll', ensureAuthenticated, (req, res) => {
    return ChatRoom.find({}).then((rooms) => {
        res.send(rooms);
    });
});

router.get('/getUserRooms/:id', ensureAuthenticated, (req, res) => {
    ChatRoom.find({ _id: { $in: req.user.rooms } }, (err, list) => {
        return res.json({
            status: 200,
            list,
        });
    });
});

router.get('/getRoomsToJoin', ensureAdminAuthenticated, (req, res) => {
    ChatRoom.find({ _id: { $nin: req.user.rooms } }).populate({ path: 'requests', match: { user: req.user._id } }).exec((err, list) => {
        return res.json({
            status: 200,
            list,
        });
    });
});

module.exports = router;
