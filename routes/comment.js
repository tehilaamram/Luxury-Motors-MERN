let express = require('express');
let router = express.Router();
let Comment = require('../models')("Comment");
let Vehicle = require('../models')("Vehicle");
let ObjectId = require('mongoose').Types.ObjectId;
const { ensureAuthenticated } = require('./middleware');

router.post('/new', ensureAuthenticated, (req, res) => {
  let newComment = new Comment({
    date: new Date(),
    user: req.user._id,
    vehicle: req.body.vehicle,
    rate: req.body.rate,
    text: req.body.text,
  });

  newComment.save().then((savedComment) => {

    Vehicle.findById(req.body.vehicle, (err, vehicleToUpdate) => {
      vehicleToUpdate.comments.push(savedComment._id);
      vehicleToUpdate.save().then((savedVehicle) => {
        Vehicle.findById(req.body.vehicle).populate({
          path: 'comments', populate: {
            path: 'user',
            model: 'User',
          }
        }).exec((err, vehicle) => {
          if (err) {
            return res.sendStatus(404);
          }
          return res.json({
            status: 200,
            vehicle,
          });
        });
      });
    });
  });
});


router.post('/addDislike', ensureAuthenticated, (req, res) => {
  Comment.findById(req.body.comment, (err, commentToUpdate) => {
    if (err) {
      res.sendStatus(400);
    } else {
      commentToUpdate.dislike.push(req.user._id);
      commentToUpdate.save().then((savedComment) => {
        Vehicle.findById(req.body.vehicle).populate({
          path: 'comments', populate: {
            path: 'user',
            model: 'User',
          }
        }).exec((err, vehicle) => {
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
    if (err) {
      res.sendStatus(400);
    } else {
      commentToUpdate.dislike.pop(req.user._id);
      commentToUpdate.save().then((savedComment) => {
        Vehicle.findById(req.body.vehicle).populate({
          path: 'comments', populate: {
            path: 'user',
            model: 'User',
          }
        }).exec((err, vehicle) => {
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
    if (err) {
      res.sendStatus(400);
    } else {
      commentToUpdate.like.push(req.user._id);
      commentToUpdate.save().then((savedComment) => {
        Vehicle.findById(req.body.vehicle).populate({
          path: 'comments', populate: {
            path: 'user',
            model: 'User',
          }
        }).exec((err, vehicle) => {
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
    if (err) {
      res.sendStatus(400);
    } else {
      commentToUpdate.like.pop(req.user._id);
      commentToUpdate.save().then((savedComment) => {
        Vehicle.findById(req.body.vehicle).populate({
          path: 'comments', populate: {
            path: 'user',
            model: 'User',
          }
        }).exec((err, vehicle) => {
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
