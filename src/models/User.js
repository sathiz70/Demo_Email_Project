'use strict';

// node modules
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, lowercase: true, trim: true, default: '' },
    fullName: { type: String, default: '' },
    gender: { type: String, default: '' },
    age: { type: Number, default: 0 },
    country: { type: String, default: '' },
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zipCode: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

// do not return password
userSchema.set('toJSON', {
  transform(_doc, ret, _opt) {
    delete ret['password'];
    return ret;
  },
});

// on save hook
userSchema.pre('save', function(next) {
  const user = this;
  if (!this.isModified('password')) {
    console.log('password not modified');
    return next();
  }
  console.log('password modified');
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
