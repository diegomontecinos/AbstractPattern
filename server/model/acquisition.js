const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const acquisitionSchema = new Schema({
  art: { type: Schema.Types.ObjectId, required: true},
  qty: { type: Number, required: true},
  date: { type: Date, required: true },
  status: { type: String, required: true },
  coments: { type: String, required: true}
}, { collection : 'acquisition' });

const Acquisition = mongoose.model('Acquisition', acquisitionSchema);

module.exports = Acquisition;
