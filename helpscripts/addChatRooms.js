var multer = require('multer');
let fs = require("fs");
var mime = require('mime-types');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadedImages');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage: storage })
const Room = require('../models')("Room");

(async () => {
    // let room1 = new Room({
    //     name: 'Luxury Motors',
    //     img: {
    //         contentType: mime.lookup('./ChatRoomImages/luxury_motors.jpg'),
    //         image: new Buffer(fs.readFileSync('./ChatRoomImages/luxury_motors.jpg').toString('base64'), 'base64'),
    //     },
    //     numMembers: 0,
    // });
    // await room1.save();
    let room2 = new Room({
        name: 'Ferrari',
        img: {
            contentType: mime.lookup('./ChatRoomImages/Ferrari.png'),
            image: new Buffer(fs.readFileSync('./ChatRoomImages/Ferrari.png').toString('base64'), 'base64'),
        },
        numMembers: 0,
    });
    await room2.save();
    process.exit(0);
})();