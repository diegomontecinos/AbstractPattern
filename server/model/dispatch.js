const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const dispatchSchema = new Schema({
  art: { type: Schema.Types.ObjectId, required: true},
  origin: { type: Schema.Types.ObjectId, required: true},
  destination: { type: Schema.Types.ObjectId, required: true},
  qty: { type: Number, required: true},
  status: { type: String, required: true },
  coments: { type: String },
  date_dis: { type: Date, required: true },
  date_rec: { type: Date}
}, {versionKey: false}, { collection : 'dispatch' });

const Dispatch = mongoose.model('Dispatch', dispatchSchema);

module.exports = Dispatch;
