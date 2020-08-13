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
    schema.statics.updatePassword = function(user, password, cb) {

        /* This instance method resets forgotten user password by invoking
        setPassword(password, cb) instance method to set a user's password
        hash and salt in the databease. */
        user.setPassword(
            password,
            function(err, user){
                /* Using setPassword() will only update the document's password
                fields, but will not save the user data. To commit changes, we
                use Mongoose's document.save().*/
                user.save(function(err){
                    if (err){
                        console.log('Failed to save the password');
                    } else {
                        console.log('Password reset!');
                    }
                    cb();
                });
            }
        );
    };
    db.model('User', schema);
    debug("User model created");
}