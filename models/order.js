const debug = require("debug")('lab7:model-user');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        userEmail: {
            type: String,
            required: true,
        },
        vehicleNumber: {
            type: String,
            required: true,
        },
        orderDate: {
            type: Date,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        creditCard: {
            type: [String],
            required: true,
        },
        status: {
            type: String,
            default: true,
        },
    }, { autoIndex: false });

    db.model('Order', schema);
    debug("Order model created");
}