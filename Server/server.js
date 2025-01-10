const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const dotenv = require('dotenv');
const { fetchCryptoData } = require('./services/cryptoService');
const cryptoRoutes = require('./routes/cryptoRoutes');
const cors = require('cors');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto-stats')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// middleware
app.use(cors()); 
app.use(express.json());

// routes
app.use('/api', cryptoRoutes);

// schedule background job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Running crypto data fetch job');
  try {
    await fetchCryptoData();
    console.log('Crypto data fetch completed');
  } catch (error) {
    console.error('Error in crypto data fetch job:', error);
  }
});

//schedule background job to run every 2 hours(for Api testing purpose)

// cron.schedule('* * * * *', async () => {
//   console.log('Running crypto data fetch job');
//   try {
//     await fetchCryptoData();
//     console.log('Crypto data fetch completed');
//   } catch (error) {
//     console.error('Error in crypto data fetch job:', error);
//   }
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});