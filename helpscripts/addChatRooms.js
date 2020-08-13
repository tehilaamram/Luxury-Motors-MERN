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
const ChatRoom = require('../models')("ChatRoom");

(async () => {
    let chatRoom1 = new ChatRoom({
        name: 'Luxury Motors',
        img: {
            contentType: mime.lookup('./ChatRoomImages/luxury_motors.jpg'),
            image: Buffer.from(fs.readFileSync('./ChatRoomImages/luxury_motors.jpg').toString('base64'), 'base64'),
        },
        numMembers: 0,
    });
    await chatRoom1.save();
    let chatRoom2 = new ChatRoom({
        name: 'Ferrari',
        img: {
            contentType: mime.lookup('./ChatRoomImages/Ferrari.png'),
            image: Buffer.from(fs.readFileSync('./ChatRoomImages/Ferrari.png').toString('base64'), 'base64'),
        },
        numMembers: 0,
    });
    await chatRoom2.save();
    process.exit(0);
})();