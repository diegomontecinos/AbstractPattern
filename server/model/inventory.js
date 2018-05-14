const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const inventorySchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true }
}, { collection : 'inventory' });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
