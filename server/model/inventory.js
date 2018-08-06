const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stock_whSchema = new Schema({
  wh: { type: Schema.Types.ObjectId, required: true },
  stock: { type: Number, required: true }
}, { collection : 'inventory' });

const inventorySchema = new Schema({
  sku: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true},
  stock_wh: [stock_whSchema]
}, {versionKey: false}, { collection : 'inventory' });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
