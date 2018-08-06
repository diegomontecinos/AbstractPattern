const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const withdrawSchema = new Schema({
  art: { type: Schema.Types.ObjectId, required: true},
  warehouse: { type: Schema.Types.ObjectId, required: true},
  qty: { type: Number, required: true},
  date1: { type: Date, required: true },
  date2: { type: Date},
  status: { type: String, required: true },
  coments1: { type: String, required: true},
  coments2: { type: String}
}, {versionKey: false}, { collection : 'withdraw' });

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;
