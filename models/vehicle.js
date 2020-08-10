const debug = require("debug")('car:model-vehicle');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        maker: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        mainImg: { 
            type: {
                data: Buffer, contentType: String,
            }
        },
        additionalImg: { 
            type: [],
            default: [],
        },
        seats: {
            type: Number,
            required: true,
        },
        doors: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            default: 1,
        },
        transmission: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        comments: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'Comment',
        }],
        orders: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'Order',
        }],
        status: {
            type: Boolean,
            default: true,
        },
    }, { autoIndex: false });

    db.model('Vehicle', schema);
    debug("Vehicle model created");
}