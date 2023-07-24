// models/formData.js
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  state: { type: String, required: true },
  religion: { type: String, required: true },
  language: { type: String, required: true },
  recordedVideoUrl: { type: String }, // New field for recorded video URL
  capturedImages: [{ type: String }], // New field for an array of captured image URLs
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
