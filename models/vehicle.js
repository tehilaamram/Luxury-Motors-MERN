const AREA=['center','north','south'];

 const ENGINE_TYPE=[
    'diesel',
    'Turbo diesel',
    'Electric hybrid / gasoline',
    'Electric / Diesel Hybrid',
    'electric',
    'LPG / gasoline',
    'GDN',
    'LPG / gasoline'
];
 const GEARBOX=[
    'Manual',
    'automaton',
    'Tifronic',
    'Robotic'
];

 const MANUFACTURER=[
    'Acura',
    'Alfa_Romeo', 'Audi','BMW','Bentley','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Fiat', 'Ford',
    'GMC', 'Genesis', 'Honda', 'Hyundai','Infiniti','Jaguar','Jeep','Kia', 'Land','Lexus',
    'Lincoln', 'Lotus','Maserati','Mazda',   'Mercedes','Mercury',    'Mini','Mitsubishi','Nissan',
    'Polestar','Pontiac', 'Porsche','Ram','Rivian',    'Rolls-Royce','Saab','Saturn',
    'Scion',    'Smart','Subaru','Suzuki',  'Tesla','Toyota','Volkswagen','Volvo',
];
 const MODEL=['A4','A5','A6','Q5','SQ5','Q7','Q8'
     ,'X1','X2','X3','X3 M','X4', 'X4','X4 M',
    'REGAL SPORTBACK', 'REGAL GS','REGAL AVENIR','REGAL TOURX'];

const debug = require("debug")('car:model-vehicle');
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        number: {
            type: String,
            required: true,
            unique: true,
        },
        area: {
            type: String,
            enum: AREA,
            required: true,
        },
        manufacturer: {
            type: String,
            enum: MANUFACTURER,
            required: true,
        },
        model: {
            type: String,
            enum: MODEL,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        engineCapacity: {
            type: Number,
            required: true,
        },
        seats: {
            type: Number,
            required: true,
        },
        engineType: {
            type: String,
            enum: ENGINE_TYPE,
            required: true,
        },
        gearbox: {
            type: String,
            enum: GEARBOX,
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