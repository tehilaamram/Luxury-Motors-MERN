const debug = require("debug")('car:model-Chat');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        room: {
            type: mongo.Schema.Types.ObjectId,
            ref: "ChatRoom",
        },
        sender: {
            type: mongo.Schema.Types.ObjectId,
            ref: "User",
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

    db.model('ChatMessage', schema);
    debug("Chat model created");
}