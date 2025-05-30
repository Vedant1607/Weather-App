import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());

const API_KEY = process.env.API_KEY;
console.log(API_KEY);

app.get('/api/:type', async (req, res) => {
    const { type } = req.params; // 'weather' or 'forecast'
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    if (!['weather', 'forecast'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type. Use "weather" or "forecast".' });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/${type}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (err) {
        console.error('Fetch failed:', err);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
