const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Fetch data from CoinGecko API
async function fetchData() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,litecoin',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
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

// Serve fetched data
app.get('/data', async (req, res) => {
  const data = await fetchData();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});