const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/OrderData', async (req, res) => {
    const { email, order_date, order_data } = req.body;

    if (!email) {
        return res.status(400).send("Email is required");
    }

    let data = order_data;
    await data.splice(0, 0, { Order_date: order_date });
    // console.log("1231242343242354", email);

    // If email not existing in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': email });
    // console.log(eId);
    if (eId === null) {
        try {
            // console.log(data);
            // console.log("1231242343242354", email);
            await Order.create({
                email: email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            // console.log(error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    } else {
        try {
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: data } }
            ).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            // console.log(error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    }
});


router.post('/myorderData', async (req, res) => {
    try{
        let mydata = await Order.findOne({ "email": req.body.email });
        res.json({orderData:mydata});
    }catch{
        res.status(500).send("Server Error");
    }
});

module.exports = router;