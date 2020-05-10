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
    }, { autoIndex: false });

    schema.plugin(passportLocalMongoose, {usernameField: "email"});
    db.model('User', schema);
    debug("User model created");
}