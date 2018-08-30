const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artSchema = new Schema({
  art: { type: Schema.Types.ObjectId, required: true},
  qty: { type: Number, required: true},
}, { collection : 'acquisition' });
// create a schema
const acquisitionSchema = new Schema({
  arts: [artSchema],
  date1: { type: Date, required: true },
  date2: { type: Date},
  date3: { type: Date},
  date3: { type: Date},
  status: { type: String, required: true },
  coments1: { type: String, required: true},
  coments2: { type: String},
  coments3: { type: String},
  coments4: { type: String}
}, {versionKey: false}, { collection : 'acquisition' });

const Acquisition = mongoose.model('Acquisition', acquisitionSchema);

module.exports = Acquisition;
