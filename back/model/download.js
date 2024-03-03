const mongoose = require('mongoose');

const downloadSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    downloadedAt: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String, // Modified to store the cover image URL as a string
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const downloadModel = mongoose.model('downloads', downloadSchema);

module.exports = downloadModel;
