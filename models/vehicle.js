const debug = require("debug")('car:model-vehicle');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        // number: {
        //     type: String,
        //     required: true,
        //     unique: true,
        // },
        // area: {
        //     type: String,
        //     enum: AREA,
        //     required: true,
        // },
        make: {
            type: String,
            // enum: MANUFACTURER,
            required: true,
        },
        model: {
            type: String,
            // enum: MODEL,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        mainImg: { 
            data: Buffer, contentType: String 
        },
        additionalImg: { 
            type: [],
            default: [],
        },
        // image: {
        //     type: String,
        //     required: true,
        // },
        // engineCapacity: {
        //     type: Number,
        //     required: true,
        // },
        seats: {
            type: Number,
            required: true,
        },
        doors: {
            type: Number,
            required: true,
        },
        // engineType: {
        //     type: String,
        //     enum: ENGINE_TYPE,
        //     required: true,
        // },
        transmission: {
            type: String,
            // enum: GEARBOX,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    }, { autoIndex: false });

    db.model('Vehicle', schema);
    debug("Vehicle model created");
}