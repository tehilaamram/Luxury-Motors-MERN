var express = require('express');
var router = express.Router();
var Order = require('../models')("Order");

router.get('/getOrder', (req, res) => {
    Order.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/updateOrder', (req, res) => {
    const { id, update } = req.body;
    Order.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete('/deleteOrder', (req, res) => {
    const { id } = req.body;
    Order.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.post('/putOrder', (req, res) => {
    let data = new Order();
    const {  userEmail, vehicleNumber,orderDate,shippingAddress,creditCard} = req.body;
    data.userEmail = userEmail;
    data.vehicleNumber = vehicleNumber;
    data.orderDate = orderDate;
    data.shippingAddress = shippingAddress;
    data.creditCard = creditCard;
    data.status = 'paid';
    console.log(data);
    data.save((err) => {
        console.log(err);
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});
module.exports = router;

