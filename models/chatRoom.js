const debug = require("debug")('car:model-chatRoom');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        name: {
            type: String,
            required: true,
        },
        numMembers: {
            type: Number,
            default: 0,
        },
        img: { 
            type: {
                data: Buffer, contentType: String,
            }
        },
    }, { autoIndex: false });

    db.model('ChatRoom', schema);
    debug("Room model created");
}