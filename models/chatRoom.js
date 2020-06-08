const debug = require("debug")('car:model-chatRoom');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        name: {
            type: String,
            required: true,
            unique : true,
        },
        members: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'User',
        }],
        onlineMembers: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'User',
        }],
        img: { 
            type: {
                data: Buffer, contentType: String,
            }
        },
        requests: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'Request',
        }],
        messages: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'ChatMessage',
        }],
        }, { autoIndex: false });

    db.model('ChatRoom', schema);
    debug("Room model created");
}