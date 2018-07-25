const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const orderSchema = new Schema({
  art: { type: Schema.Types.ObjectId, required: true},
  qty: { type: Number, required: true },
  destination: { type: Schema.Types.ObjectId, required: true},
  status: { type: String, required: true}
}, { collection : 'order' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
