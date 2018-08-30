const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
<<<<<<< HEAD
  name: { type: String }
}, { collection : 'user' });
=======
  type: { type: String, required: true },
  wh: { type: Schema.Types.ObjectId },
  whName: { type: String },
  name: { type: String }
}, {versionKey: false}, { collection : 'user' });
>>>>>>> daniel

const User = mongoose.model('User', userSchema);

module.exports = User;
