const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artSchema = new Schema({
  art: { type: Schema.Types.ObjectId, required: true},
  qty: { type: Number, required: true},
  disp: { type: Number, required: true},
  status: { type: String, required: true }
}, { collection : 'order' });
// create a schema
const orderSchema = new Schema({
  destination: { type: Schema.Types.ObjectId, required: true},
  arts: [artSchema],
  date1: { type: Date, required: true },
  date2: { type: Date},
  status: { type: String, required: true },
  coments1: { type: String, required: true},
  coments2: { type: String}
}, {versionKey: false}, { collection : 'order' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
