const debug = require("debug")('car:model-Chat');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        room: {
            type: mongo.Schema.Types.ObjectId,
            ref: "Room",
        },
        sender: {
            type: mongo.Schema.Types.ObjectId,
            required: "User",
        },
        message: { 
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    }, { autoIndex: false });

    db.model('Chat', schema);
    debug("Chat model created");
}