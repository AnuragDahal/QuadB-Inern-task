import express from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import cors from 'cors';  // Import the cors package

const app = express();
const port = 3000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://anurag:cluster0@cluster0.igpenxg.mongodb.net/Quad-B-Tech')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema
const cryptoSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String
});

// Create model
const CryptoData = mongoose.model('CryptoData', cryptoSchema);

// Fetch data from WazirX API and store in database
async function fetchAndStoreData() {
  try {
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    const data = await response.json();
    
    const top10 = Object.values(data)
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 10);
    
    for (const item of top10) {
      await CryptoData.findOneAndUpdate(
        { name: item.name },
        {
          last: item.last,
          buy: item.buy,
          sell: item.sell,
          volume: item.volume,
          base_unit: item.base_unit
        },
        { upsert: true, new: true }
      );
    }
    
    console.log('Data updated successfully');
  } catch (error) {
    console.error('Error fetching or storing data:', error);
  }
}

// API route to get stored data
app.get('/api/tickers', async (req, res) => {
  try {
    const result = await CryptoData.find().sort('-last').limit(10);
    res.json(result);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  
  // Fetch and store data initially
  fetchAndStoreData();
  
  // Update data every 5 minutes
  setInterval(fetchAndStoreData, 5 * 60 * 1000);
});
