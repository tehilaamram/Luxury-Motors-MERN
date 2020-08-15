var express = require('express');
var multer = require('multer');
let fs = require("fs");
var router = express.Router();
const { ensureWorkerAuthenticated} = require('./middleware');
var Vehicle = require('../models')("Vehicle");
var ObjectId = require('mongoose').Types.ObjectId;
var storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, 'uploadedImages');
  // },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
})

const upload = multer({ storage: storage })
router.post('/addVehicle', [ensureWorkerAuthenticated, upload.array('file', 30)], (req, res) => {
  console.log(req.files);
  var additionalImagesList = [];
  for (var i =1; i < req.files.length; i++) {
    var img = fs.readFileSync(req.files[i].path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
    var finalImg = {
      contentType: req.files[i].mimetype,
      image: Buffer.from(encode_image, 'base64')
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
    maker: req.body.maker,
    model: req.body.model,
    color: req.body.color,
    mainImg: finalImg,
    additionalImg: additionalImagesList,
    seats: req.body.seats,
    doors: req.body.doors,
    transmission: req.body.transmission,
    year: req.body.year,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  newVehicle.save().then((vehicle) => {
    console.log(vehicle, ' vehicle saved');
    res.json({
      status: 200,
    id: vehicle.id,
  });
  });
});

router.get('/getAll', (req, res) => {
  return Vehicle.find({}).then((vehicles) => {
    res.send(vehicles);
  });
});

router.get('/getVehicle/:id', (req, res) => {
  Vehicle.findById(req.params.id).populate({ path: 'comments', populate: {
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
  
});
router.post('/updateVehicle', (req, res) => {
  const { id, update } = req.body;
  Vehicle.findByIdAndUpdate(id, update, (err) => {
    console.log(id);
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
router.get('/getVehiclesById/', (req, res) => {
// console.log('in get by id', JSON.parse(req.query.params));
var idJson = JSON.parse(req.query.params);
var obj_ids = idJson.vid.map(function(element) { return ObjectId(element.vehicle); });
Vehicle.find({_id: {$in: obj_ids}}, (err, list) => {
  return res.json({
    status: 200,
    list,
  });})
});

module.exports = router;
