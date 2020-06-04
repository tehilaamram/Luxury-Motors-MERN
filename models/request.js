const debug = require("debug")('car:model-chatRoom');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        user: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'User',
        },
        room: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'ChatRoom',
        },
        date: { 
            type: Date,
        },
    }, { autoIndex: false });

    db.model('Request', schema);
    debug("Request model created");
}