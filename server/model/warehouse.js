const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
  name: { type: String }
}, { collection : 'warehouse' });

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;
