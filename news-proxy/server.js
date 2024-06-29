const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = '2872804bad6a4e04ad68516987a173c5'; // Replace with your API key

app.use(cors());

app.get('/news', async (req, res) => {
    const query = req.query.q;
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=popularity&apiKey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching news", error);
        res.status(500).json({ error: 'Error fetching news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
