const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const acquisitionSchema = new Schema({
  art: { type: Schema.Types.ObjectId, required: true},
  destination: { type: Schema.Types.ObjectId, required: true},
  qty: { type: Number, required: true},
  dateAcq: { type: Date, required: true },
  dateRec: { type: Date},
  status: { type: String, required: true },
  coments: { type: String, required: true},
  coments2: { type: String}
}, {versionKey: false}, { collection : 'acquisition' });

const Acquisition = mongoose.model('Acquisition', acquisitionSchema);

module.exports = Acquisition;
