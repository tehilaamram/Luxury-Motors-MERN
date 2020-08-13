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
        Order.findById(savedOrder._id, (err, orderToUpdate) => {
            if (err) {
                res.sendStatus(404);
            } else {
                req.body.vehicles.forEach(element => {
                    var newVehicleOrder = new VehicleOrder({
                                order: savedOrder._id,
                                vehicle: element.id,
                                quantity: element.quantity,
                                price: element.price,
                            });
                            newVehicleOrder.save().then((savedVehicleOrder) => {
                                orderToUpdate.vehicles.push(savedVehicleOrder._id);
                                orderToUpdate.save();
                            });
                });
            }
        })
        // req.body.vehicles.forEach(element => {
        //     var newVehicleOrder = new VehicleOrder({
        //                 order: savedOrder._id,
        //                 vehicle: element.id,
        //                 quantity: element.quantity,
        //                 price: element.price,
        //             });
        //             newVehicleOrder.save().then((savedVehicleOrder) => {
        //                 savedOrder.vehicles.push(savedVehicleOrder._id);
        //                 savedOrder.save();
        //             });
        // });
        // savedOrder.save().then((s) => {
            res.sendStatus(200);
        // });
        // req.body.vehicles.foreach((element) => {
        //     var newVehicleOrder = new VehicleOrder({
        //         order: savedOrder._id,
        //         vehicle: element._id,
        //         quantity: element.quantity,
        //         price: element.price,
        //     });
        //     newVehicleOrder.save();
        // });
    });
});
router.get('/getUserOrders', ensureAuthenticated, (req, res) => {
    Order.find({user: req.user._id}).populate({ path: 'vehicles', model: "VehicleOrder", populate: {
        path: "vehicle", model: "Vehicle"
    }}).exec((err, list) => {
        if(err) {
            res.sendStatus(404);
        } else {
            res.json({
                status: 200,
                list,
            });
        }
    });
    // .populate({path: 'vehicle', model: 'Vehicle'}).exec((err, list) => {
    //     if(err) {
    //         res.sendStatus(404);
    //     } else {
    //         res.json({
    //             status: 200,
    //             list,
    //         });
    //     }
    //   });
  });

module.exports = router;
