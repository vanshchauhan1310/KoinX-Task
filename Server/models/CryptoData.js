const mongoose = require('mongoose');

const cryptoDataSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum']
  },
  price: {
    type: Number,
    required: true
  },
  marketCap: {
    type: Number,
    required: true
  },
  change24h: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
cryptoDataSchema.index({ coinId: 1, timestamp: -1 });

module.exports = mongoose.model('CryptoData', cryptoDataSchema);