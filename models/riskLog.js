const mongoose = require('mongoose');

const riskLogSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  transcribedText: { type: String, required: true },
  riskScore: { type: Number, required: true },
  responseMessage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const RiskLog = mongoose.model('RiskLog', riskLogSchema);

module.exports = RiskLog;