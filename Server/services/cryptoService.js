const axios = require('axios');
const CryptoData = require('../models/CryptoData');

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

async function fetchCryptoData() {
  try {
    const response = await axios.get(`${COINGECKO_API}/simple/price`, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true
      }
    });

    const promises = COINS.map(async (coinId) => {
      const data = response.data[coinId];
      return new CryptoData({
        coinId,
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change
      }).save();
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
}

async function getLatestStats(coinId) {
  const latestData = await CryptoData.findOne({ coinId })
    .sort({ timestamp: -1 })
    .lean();

  if (!latestData) {
    throw new Error('No data found for the specified coin');
  }

  return {
    price: latestData.price,
    marketCap: latestData.marketCap,
    "24hChange": latestData.change24h
  };
}

async function calculateDeviation(coinId) {
  const data = await CryptoData.find({ coinId })
    .sort({ timestamp: -1 })
    .limit(100)
    .select('price')
    .lean();

  if (data.length === 0) {
    throw new Error('No data found for the specified coin');
  }

  const prices = data.map(item => item.price);
  const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
  const squaredDiffs = prices.map(price => Math.pow(price - mean, 2));
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / prices.length;
  const deviation = Math.sqrt(variance);

  return {
    deviation: Number(deviation.toFixed(2))
  };
}

module.exports = {
  fetchCryptoData,
  getLatestStats,
  calculateDeviation
};