const debug = require("debug")('car:model-chatRoom');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        img: { 
            type: {
                data: Buffer, contentType: String,
            }
        },
    }, { autoIndex: false });

    db.model('Room', schema);
    debug("Room model created");
}