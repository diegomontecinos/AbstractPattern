const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb://localhost/gpi2db';

const User = require('./model/user');
const Inventory = require('./model/inventory');
const Order = require('./model/order');
const Warehouse = require('./model/warehouse');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.post('/api/user/login', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        User.find({
            username : req.body.username, password : req.body.password
        }, function(err, user){
            if(err) throw err;
            if(user.length === 1){
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }

        })
    });
})

app.post('/api/inventory/getAllInv', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        Inventory.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/orders/getAllOrd', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        Order.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/orders/createOrder', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        const order = new Order({
            name: req.body.name,
            qty: req.body.qty,
            status: req.body.status
        })
        order.save((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/orders/updateOrder', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        Order.update(
            { _id: req.body.id },
            { name: req.body.name,
            qty: req.body.qty,
            status: req.body.status },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/orders/deleteOrder', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        Order.findByIdAndRemove(req.body.id,
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})


app.post('/api/warehouse/getAllWH', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        Warehouse.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.listen(3000, () => console.log('Servidor up! en puerto 3000!!!'))
