

const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    unique: true,
  },
  display: {
    type: Boolean,
    default: true,
  },
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
