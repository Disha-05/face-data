// models/formData.js
const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  state: { type: String, required: true },
  aadhaarNo:{type: String, required: true},
  religion: { type: String, required: true },
  language: { type: String, required: true },
  recordedVideoUrl: { type: String },
  lookFrontMetric: { type: String },
  lookUpMetric: { type: String },
  lookDownMetric: { type: String },
  lookLeftMetric: { type: String },
  lookRightMetric: { type: String },
  maskOnMetric: { type: String },
  spectaclesOnMetric: { type: String },
  // capturedImages: [{ type: String }],
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
