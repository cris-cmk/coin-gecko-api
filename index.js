const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Fetch currencies from CoinGecko API
async function fetchCurrencies() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
    if(response.status == 200)
    return response.data;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return [];
  }
}

// Serve HTML page
app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/data.html');
});

// Serve CSS file
app.get('/styles.css', (req, res) => {
  res.sendFile(__dirname + '/styles.css');
});

// Serve fetched currencies
app.get('/currencies', async (req, res) => {
  const currencies = await fetchCurrencies();
  res.json(currencies);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});