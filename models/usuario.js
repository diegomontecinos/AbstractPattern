// grab the things we need
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var Schema = mongoose.Schema;

var UserSchema = new mongose.Schema({
  nombre:{type: String},
  apellido:{type: String},
  usuario:{type: String, required: true, unique: true},
  hash:String,
  salt:String
});

userSchema.methoods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt,1000,64),'sha512').toString('hex');
};


UserSchema.methoods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
  return this.hash === hash;
};



module.exports = mongoose.model(User&, UserSchema)
