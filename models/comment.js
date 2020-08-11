const debug = require("debug")('car:model-comments');
const mongo = require("mongoose");
// mongo.set('useCreateIndex', true);

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        user: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'User',
        },
        vehicle: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'Vehicle',
        },
        date: { 
            type: Date,
        },
        rate: {
            type: Number,
            default: undefined,
        },
        images: {
            type: [],
            default: [],
        },
        text: {
            type: String
        },
    }, { autoIndex: true });
    // schema.index({ user: 1, vehicle: 1 }, { unique: true });

    db.model('Comment', schema);
    debug("Comment model created");
}