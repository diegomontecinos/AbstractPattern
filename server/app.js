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
const Withdraw = require('./model/withdraw');
const Worker = require('./model/worker');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
mongoose.connect(url, function(err){
    if(err) throw err;});

app.post('/api/user/login', (req, res) => {
        User.find({
            username : req.body.username, password : req.body.password
        }, 'name type wh whName', function(err, user){
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
})

app.post('/api/inventory/getAllInv', (req, res) => {
        Inventory.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/inventory/deleteInv', (req, res) => {
        Inventory.findByIdAndRemove(req.body.id,
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/inventory/createInv', (req, res) => {
        const inventory = new Inventory({
            sku : req.body.sku,
            name: req.body.name,
            brand: req.body.brand,
            stock_wh: req.body.stock_wh
        })
        inventory.save((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/inventory/updateInventory', (req, res) => {
        Inventory.update(
            { _id: req.body.id },
            { sku: req.body.sku,
            name: req.body.name,
            brand: req.body.brand,
            stockWH: req.body.stocwh
            },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/inventory/updateStock', (req, res) => {
        Inventory.update(
            { _id: req.body.id,
            "stock_wh.wh": req.body.wh },
            { "$set":
            { "stock_wh.$.stock": req.body.stock }
            },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/orders/getAllOrd', (req, res) => {
        Order.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/orders/createOrder', (req, res) => {
        const order = new Order({
            destination: req.body.destination,
            status: req.body.status,
            date1: req.body.date1,
            coments1: req.body.coments1,
            arts: req.body.arts
        })
        order.save((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/orders/updateOrder', (req, res) => {
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
})

app.post('/api/orders/updateOrderStatus', (req, res) => {
        Order.update(
            { _id: req.body.id },
            { status: req.body.status },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/orders/deleteOrder', (req, res) => {
        Order.findByIdAndRemove(req.body.id,
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/orders/updateOrderItem', (req, res) => {
        Order.update(
            { _id: req.body.id,
            "arts.art": req.body.art },
            { "$set":
            { "arts.$.status": req.body.status,
              "arts.$.disp": req.body.disp }
            },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/warehouse/getAllWH', (req, res) => {
        Warehouse.find({},[],{ sort: { _id: 1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/acquisition/getAllAcq', (req, res) => {

        Acquisition.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })

})

app.post('/api/acquisition/createAcquisition', (req, res) => {
        const acquisition = new Acquisition({
            arts: req.body.arts,
            status: req.body.status,
            coments1: req.body.coments1,
            date1: req.body.date1,
        })
        acquisition.save((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/acquisition/cancelAcquisition', (req, res) => {
        Acquisition.findByIdAndRemove(req.body.id,
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/acquisition/updateAcquisition', (req, res) => {
        Acquisition.update(
            { _id: req.body.id },
            { status: req.body.status,
              date2: req.body.date2,
              date3: req.body.date3,
              date4: req.body.date4,
              coments2: req.body.coments2,
              coments3: req.body.coments3,
              coments4: req.body.coments4 },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/acquisition/updateStatusAcq', (req, res) => {
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
})

app.post('/api/dispatch/getAllDis', (req, res) => {
        Dispatch.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/dispatch/createDispatch', (req, res) => {
        const dispatch = new Dispatch({
            arts: req.body.arts,
            origin: req.body.origin,
            destination: req.body.destination,
            date1: req.body.date1,
            coments1: req.body.coments1,
            status: req.body.status,
            order: req.body.order
        })
        dispatch.save((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/dispatch/updateStatusDis', (req, res) => {
        Dispatch.update(
            { _id: req.body.id },
            { coments2: req.body.coments2,
            status: req.body.status,
            date2: req.body.date2 },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/withdraw/getAllWithdraw', (req, res) => {
        Withdraw.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/withdraw/createWithdraw', (req, res) => {
        const withdraw = new Withdraw({
            arts: req.body.arts,
            status: req.body.status,
            coments1: req.body.coments1,
            date1: req.body.date1,
            warehouse: req.body.warehouse,
            worker: req.body.worker
        })
        withdraw.save((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/withdraw/updateWithdraw', (req, res) => {
        Withdraw.update(
            { _id: req.body.id },
            { coments2: req.body.coments2,
            status: req.body.status,
            date2: req.body.date2 },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/withdraw/updateWithdrawItem', (req, res) => {
        Withdraw.update(
            { _id: req.body.id,
            "arts.art": req.body.art },
            { "$set":
            { "arts.$.status": req.body.status,
              "arts.$.giveback": req.body.giveback,}
            },
            (err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.post('/api/worker/getAllWorkers', (req, res) => {
        Worker.find({},[],{ sort: { _id: -1 } },(err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
})

app.listen(3000, () => console.log('Servidor up! en puerto 3000!!!'))
