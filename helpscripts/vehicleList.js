const Vehicle = require('../models')("Vehicle");
let vehicles;
(async () => {
    try {
        vehicles = await Vehicle.find({});
        console.log(vehicles);
    } catch (err) { console.log(`Failed: ${err}`) }
    process.exit(0);
})();