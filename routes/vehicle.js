var express = require('express');
var multer = require('multer');
let fs = require("fs");
var router = express.Router();
var Vehicle = require('../models')("Vehicle");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadedImages');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
})

var upload = multer({ storage: storage })
router.post('/addVehicle', upload.array('file', 12), (req, res) => {
  console.log(req.files);
  var additionalImagesList = [];
  for (var i =1; i < req.files.length; i++) {
    var img = fs.readFileSync(req.files[i].path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
    var finalImg = {
      contentType: req.files[i].mimetype,
      image: new Buffer(encode_image, 'base64')
    };
    additionalImagesList.push(finalImg);
  }
  console.log('in add vehicle');
  var img = fs.readFileSync(req.files[0].path);
  var encode_image = img.toString('base64');
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.files[0].mimetype,
    image: new Buffer(encode_image, 'base64')
  };
  var newVehicle = new Vehicle({
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    mainImg: finalImg,
    additionalImg: additionalImagesList,
    seats: req.body.seats,
    doors: req.body.doors,
    transmission: req.body.transmission,
  });
  newVehicle.save().then((vehicle) => {
    res.sendStatus(200);
        // res.redirect('/')

  });
  // Vehicle.insertOne(finalImg, (err, result) => {
  //   console.log(result)

  //   if (err) return console.log(err)

  //   console.log('saved to database')
  //   // res.redirect('/')


  // })
})

module.exports = router;
