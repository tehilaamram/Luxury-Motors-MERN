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
                    console.log(element, ' element')
                    Vehicle.findOneAndUpdate({ _id: element.id }, { quantity: element.oldQuantity - element.quantity }, { new: true }, function (err, doc) {
                        if (err) {
                            res.sendStatus(400);
                        }
                        console.log(doc)
                        // else {
                        //   res.sendStatus(200);
                        // }
                    });
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
        });

        res.sendStatus(200);
    });
});
router.get('/getUserOrders', ensureAuthenticated, (req, res) => {
    Order.find({ user: req.user._id }).populate({
        path: 'vehicles', model: "VehicleOrder", populate: {
            path: "vehicle", model: "Vehicle"
        }
    }).exec((err, list) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.json({
                status: 200,
                list,
            });
        }
    });
});

router.get('/getAll', ensureAuthenticated, (req, res) => {
    Order.find({}).populate({
        path: 'vehicles user', populate: {
            path: "vehicle", model: "Vehicle"
        }
    }).exec((err, list) => {
        if (err) {
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
