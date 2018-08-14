const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artSchema = new Schema({
  art: { type: Schema.Types.ObjectId, required: true},
  qty: { type: Number, required: true}
}, { collection : 'order' });
// create a schema
const dispatchSchema = new Schema({
  arts: [artSchema],
  origin: { type: Schema.Types.ObjectId, required: true},
  destination: { type: Schema.Types.ObjectId, required: true},
  order: { type: Schema.Types.ObjectId},
  status: { type: String, required: true },
  coments1: { type: String, required: true},
  coments2: { type: String},
  date1: { type: Date, required: true },
  date2: { type: Date}
}, {versionKey: false}, { collection : 'dispatch' });

const Dispatch = mongoose.model('Dispatch', dispatchSchema);

module.exports = Dispatch;
