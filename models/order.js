const debug = require("debug")('car:model-order');
const mongo = require("mongoose");
// mongo.set('useCreateIndex', true);

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        user: {
            type: mongo.Schema.Types.ObjectId,
            ref: 'User',
        },
        date: { 
            type: Date,
        },
        vehicles: [{
            type: [mongo.Schema.Types.ObjectId],
            default: [],
            ref: 'VehicleOrder',
        }],
    }, { autoIndex: true });
    // schema.index({ user: 1, vehicle: 1 }, { unique: true });

    db.model('Order', schema);
    debug("Order model created");
}