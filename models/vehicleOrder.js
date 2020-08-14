const debug = require("debug")('car:model-vehicleOrder');
const mongo = require("mongoose");
mongo.set('useCreateIndex', true);

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        order: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'User',
        },
        vehicle: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'Vehicle',
        },
        quantity: { 
            type: Number,
            default: 1,
        },
        price: {
            type: Number,
            default: 1,
        },
        status: {
            type: String,
            required: true,
        },
    }, { autoIndex: true });
    schema.index({ order: 1, vehicle: 1 }, { unique: true });

    db.model('VehicleOrder', schema);
    debug("VehicleOrder model created");
}