// models/formData.js
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  state: { type: String, required: true },
  religion: { type: String, required: true },
  language: { type: String, required: true },
  recordedVideoUrl: { type: String },
  capturedImages: [{ type: String }],
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
