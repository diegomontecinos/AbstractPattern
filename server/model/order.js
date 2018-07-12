const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const orderSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: String, required: true },
  status: { type: String, required: true}
}, { collection : 'order' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
