const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();
const {OrderItem} = require('../models/order-item');
const { populate } = require('dotenv');



router.get  ('/', async (req, res) => {
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList);
})

router.get  ('/:id', async (req, res) => {
    const orderList = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({
        path: 'orderItems', populate: {
            path: 'product', populate: 'category'
        }
    });

    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList);
})


router.post('/', async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product,
        })
        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))       

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async orderItemId => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }))

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    console.log(totalPrices);
   
    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    });
    order = await order.save();
    if (!order)
         return res.status(400).send('La commande ne peut pas être créée!')
    res.send(order);
})

router.put('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status,
        },
        { new: true }
    );
    if (!order)
         return res.status(400).send('La commande ne peut pas être mise à jour!')
    res.send(order);
})

router.delete('/:id', (req, res) => {
    Order.findByIdAndDelete(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndDelete(orderItem);
            })
            return res.status(200).json({ success: true, message: 'La commande a été supprimée!' });
        } else {
            return res.status(404).json({ success: false, message: 'La commande est non éxistente!' });
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err });
    });
})

router.get('/get/totalsales', async (req, res) => {
    const totalSales = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: '$totalPrice' }
            }
        }
    ]);
    if (!totalSales) {
        return res.status(400).send('La somme totale ne peut pas être générer!')
    }
    res.send({ totalSales: totalSales.pop().totalSales });
})

router.get(`/get/count`, async (req, res) => {
        const orderCount = await Order.countDocuments()
        if(!orderCount){
            res.status(500).json({success: false})
        }
        res.send({
            Count: orderCount
        });
    })

router.get  ('/get/userorders/:userid', async (req, res) => {
    const userOrderList = await Order.find({user: req.params.userid}).populate({
        path: 'orderItems', populate: {
            path: 'product', populate: 'category'
        }
    }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    }
    res.send(userOrderList);
})


module.exports = router;

