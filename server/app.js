const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb://localhost/gpi2db';

const User = require('./model/user');
const Inventory = require('./model/inventory');
const Order = require('./model/order');
const Warehouse = require('./model/warehouse');
const Acquisition = require('./model/acquisition');
const Dispatch = require('./model/dispatch');

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

app.post('/api/acquisition/getAllAcq', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        Acquisition.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/acquisition/createAcq', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        const acquisition = new Acquisition({
            art: req.body.art,
            qty: req.body.qty,
            status: req.body.status,
            coments: req.body.coments,
            dateAcq: req.body.dateAcq,
            destination: req.body.destination
        })
        acquisition.save((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/acquisition/updateStatusAcq', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        Acquisition.update(
            { _id: req.body.id },
            { coments2: req.body.coments2,
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

app.post('/api/dispatch/getAllDis', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        Dispatch.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/dispatch/createDis', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        const dispatch = new Dispatch({
            art: req.body.art,
            origin: req.body.origin,
            destination: req.body.destination,
            qty: req.body.qty,
            date_dis: req.body.date_dis,
            status: req.body.status
        })
        dispatch.save((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    });
})

app.post('/api/dispatch/updateStatusDis', (req, res) => {
    mongoose.connect(url, function(err){
        if(err) throw err;
        Dispatch.update(
            { _id: req.body.id },
            { coments: req.body.coments,
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

app.listen(3000, () => console.log('Servidor up! en puerto 3000!!!'))
