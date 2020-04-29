const debug = require("debug")('lab7:model-user');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        level: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
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
    }, { autoIndex: false });

    db.model('User', schema);
    debug("User model created");
}