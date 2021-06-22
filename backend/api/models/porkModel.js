const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PorkSchema = new Schema({
  participantId: {
    type: String,
    required: true
  },
  sentimentScore: {
    type: Number,
    required: true
  },
  intervalTime: {
    type: Date,
    default: Date.now
  },
  mediaTime: {
    type: Date
  },
  systemTime: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Pork', PorkSchema);