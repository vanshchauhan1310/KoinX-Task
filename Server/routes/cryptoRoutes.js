const express = require('express');
const { getLatestStats, calculateDeviation } = require('../services/cryptoService');

const router = express.Router();

const validateCoin = (req, res, next) => {
  const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
  const { coin } = req.query;

  if (!coin || !validCoins.includes(coin)) {
    return res.status(400).json({
      error: 'Invalid coin. Must be one of: bitcoin, matic-network, ethereum'
    });
  }

  next();
};

router.get('/stats', validateCoin, async (req, res) => {
  try {
    const stats = await getLatestStats(req.query.coin);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/deviation', validateCoin, async (req, res) => {
  try {
    const result = await calculateDeviation(req.query.coin);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;