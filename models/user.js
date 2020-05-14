const debug = require("debug")('lab7:model-user');
const mongo = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        role: {
            type: String,
            required: true,
        },
        attemptsField: {
            type: Number,
            default: 0,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        fullName: {
            type: String,
            required: true,
        },
        cart: {
            type: [String],
            default: [],
        },
        wishList: {
            type: [String],
            default: [],
        },
        status: {
            type: Boolean,
            default: true,
        },
        resetPasswordToken: {
            type: String,
            default: '',
        },
        resetPasswordExpires: {
            type: Date,
            default: undefined,
        },
        rooms: [{
            type: mongo.Schema.Types.ObjectId,
            ref: 'Room'
        }],
    }, { autoIndex: false });

    schema.plugin(passportLocalMongoose);
    db.model('User', schema);
    debug("User model created");
}