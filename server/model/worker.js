const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const workerSchema = new Schema({
  rol: { type: String, required: true, unique: true },
  name: { type: String, required: true }
}, { collection : 'worker' });

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
