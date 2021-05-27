const debug = require("debug")('lab7:model-user');
const mongo = require("mongoose");
let passportLocalMongoose = require('passport-local-mongoose');

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        role: {
            type: String,
            required: true,
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
        phone: {
            type: Number,
            default: undefined,
        },
        rooms: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'ChatRoom'
        }],
        orders: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'Order'
        }],
        requests: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'Request'
        }],
    }, { autoIndex: false });

    schema.plugin(passportLocalMongoose);
    schema.statics.updatePassword = function (user, password, cb) {
        user.setPassword(
            password,
            function (err, user) {
                user.save(function (err) {
                    cb();
                });
            }
        );
    };
    db.model('User', schema);
    debug("User model created");
}