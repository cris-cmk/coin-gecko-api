const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Fetch all coins from CoinGecko API
async function fetchCoins() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    return [];
  }
}

// Serve HTML page
app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve CSS file
app.get('/styles.css', (req, res) => {
  res.sendFile(__dirname + '/styles.css');
});

// Serve fetched coins
app.get('/coins', async (req, res) => {
  const coins = await fetchCoins();
  res.json(coins);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});