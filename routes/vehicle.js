var express = require('express');
var router = express.Router();
var Vehicle = require('../models')("Vehicle");
router.get('/getVehicle', (req, res) => {
    Vehicle.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateVehicle', (req, res) => {
    const { id, update } = req.body;
    Vehicle.findByIdAndUpdate(id, update, (err) => {
        console.log(id);
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteVehicle', (req, res) => {
    const { number } = req.body;
    Vehicle.findByIdAndRemove(number, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// this is our create methid
// this method adds new data in our database
router.post('/putVehicle', (req, res) => {
    let data = new Vehicle();

    const { number, area, manufacturer,model,color,image,engineCapacity,seats,engineType,gearbox } = req.body;

    data.number = number;
    data.area = area;
    data.manufacturer = manufacturer;
    data.model = model;
    data.color = color;
    data.image = image;
    data.engineCapacity = engineCapacity;
    data.seats = seats;
    data.engineType = engineType;
    data.gearbox = gearbox;
    data.status = true;
    console.log(data);
    data.save((err) => {
        console.log(err);
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;
