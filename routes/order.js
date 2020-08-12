var express = require('express');
var router = express.Router();
var Order = require('../models')("Order");
var Vehicle = require('../models')("Vehicle");
var ObjectId = require('mongoose').Types.ObjectId;
const { ensureAuthenticated } = require('./middleware');

router.post('/new', ensureAuthenticated, (req, res) => {
    var newOrder = new Comment({
        date: new Date(),
        user: req.user._id,
        vehicle: req.body.vehicle,
        quantity: req.body.quantity,
        price: req.body.price,
    });
    
    newOrder.save().then((savedOrder) => {
     
        Vehicle.findById(req.body.vehicle, (err, vehicleToUpdate) => {
            if(err) {
                res.sendStatus(400);
            }
            vehicleToUpdate.ordrs.push(savedOrder._id);
            vehicleToUpdate.save();
            req.user.orders.push(savedOrder._id);
            res.sendStatus(200);
        });
    });
});


router.post('/addDislike', ensureAuthenticated, (req, res) => {
   Comment.findById(req.body.comment, (err, commentToUpdate) => {
       if(err) {
           res.sendStatus(400);
       } else {
           commentToUpdate.dislike.push(req.user._id);
           commentToUpdate.save().then((savedComment) => {
            Vehicle.findById(req.body.vehicle).populate({ path: 'comments', populate: {
                path: 'user',
                model: 'User',
              }}).exec((err, vehicle) => {
                if (err) {
                  return res.sendStatus(404);
                }
                return res.json({
                  status: 200,
                  vehicle,
                });
              });
           })
       }
   });
});

router.post('/removeDislike', ensureAuthenticated, (req, res) => {
    Comment.findById(req.body.comment, (err, commentToUpdate) => {
        if(err) {
            res.sendStatus(400);
        } else {
            commentToUpdate.dislike.pop(req.user._id);
            commentToUpdate.save().then((savedComment) => {
             Vehicle.findById(req.body.vehicle).populate({ path: 'comments', populate: {
                 path: 'user',
                 model: 'User',
               }}).exec((err, vehicle) => {
                 if (err) {
                   return res.sendStatus(404);
                 }
                 return res.json({
                   status: 200,
                   vehicle,
                 });
               });
            })
        }
    });
 });

 router.post('/addLike', ensureAuthenticated, (req, res) => {
    Comment.findById(req.body.comment, (err, commentToUpdate) => {
        if(err) {
            res.sendStatus(400);
        } else {
            commentToUpdate.like.push(req.user._id);
            commentToUpdate.save().then((savedComment) => {
             Vehicle.findById(req.body.vehicle).populate({ path: 'comments', populate: {
                 path: 'user',
                 model: 'User',
               }}).exec((err, vehicle) => {
                 if (err) {
                   return res.sendStatus(404);
                 }
                 return res.json({
                   status: 200,
                   vehicle,
                 });
               });
            })
        }
    });
 });
 
 router.post('/removeLike', ensureAuthenticated, (req, res) => {
     Comment.findById(req.body.comment, (err, commentToUpdate) => {
         if(err) {
             res.sendStatus(400);
         } else {
             commentToUpdate.like.pop(req.user._id);
             commentToUpdate.save().then((savedComment) => {
              Vehicle.findById(req.body.vehicle).populate({ path: 'comments', populate: {
                  path: 'user',
                  model: 'User',
                }}).exec((err, vehicle) => {
                  if (err) {
                    return res.sendStatus(404);
                  }
                  return res.json({
                    status: 200,
                    vehicle,
                  });
                });
             })
         }
     });
  });

module.exports = router;
