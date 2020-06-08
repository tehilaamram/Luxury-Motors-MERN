const debug = require("debug")('car:model-chatRoom');
const mongo = require("mongoose");
mongo.set('useCreateIndex', true);

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
    }, { autoIndex: true });
    schema.index({ user: 1, room: 1 }, { unique: true });

    db.model('Request', schema);
    debug("Request model created");
}