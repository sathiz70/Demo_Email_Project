'use strict';

// node modules
const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailSchema = new Schema(
  {
    email: { type: String, lowercase: true, trim: true, default: '' },
    status: { type: Boolean, default: false },

  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('EmailHistory', emailSchema);
