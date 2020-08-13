var express = require('express');
var router = express.Router();
var Order = require('../models')("Order");
var Vehicle = require('../models')("Vehicle");
var VehicleOrder = require('../models')("VehicleOrder");
var ObjectId = require('mongoose').Types.ObjectId;
const { ensureAuthenticated } = require('./middleware');

router.post('/new', ensureAuthenticated, (req, res) => {
    var newOrder = new Order({
        date: new Date(),
        user: req.user._id,
    });
    newOrder.save().then((savedOrder) => {
        req.user.orders.push(savedOrder._id);
        req.user.save();
        req.body.vehicles.forEach(element => {
            var newVehicleOrder = new VehicleOrder({
                        order: savedOrder._id,
                        vehicle: element.id,
                        quantity: element.quantity,
                        price: element.price,
                    });
                    newVehicleOrder.save();
        });
        // req.body.vehicles.foreach((element) => {
        //     var newVehicleOrder = new VehicleOrder({
        //         order: savedOrder._id,
        //         vehicle: element._id,
        //         quantity: element.quantity,
        //         price: element.price,
        //     });
        //     newVehicleOrder.save();
        // });
        res.sendStatus(200);
    });
});
router.get('/getUserOrders/:id', ensureAuthenticated, (req, res) => {
    Order.find({user: req.user._id}).populate({ path: 'user', model: 'User'})
    .populate({path: 'vehicle', model: 'Vehicle'}).exec((err, list) => {
        if(err) {
            res.sendStatus(404);
        } else {
            res.json({
                status: 200,
                list,
            });
        }
      });
  });

module.exports = router;
