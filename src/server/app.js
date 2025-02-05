const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const getLocationData = require('./geonamesAPI').default;
const getWeatherData = require('./weatherbitAPI').default;
const getImage = require('./pixabayAPI').default;

dotenv.config(); 

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist')); 

app.get('/location', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    const locationData = await getLocationData(city);
    if (!locationData) return res.status(500).json({ error: "Failed to fetch location data" });

    res.json(locationData);
});

app.get('/weather', async (req, res) => {
    const { lat, lon, date } = req.query;
    if (!lat || !lon || !date) {
        return res.status(400).json({ error: "Latitude, longitude, and date are required" });
    }

    const isFuture = new Date(date) > new Date(); 
    const weatherData = await getWeatherData(lat, lon, isFuture);

    if (!weatherData) return res.status(500).json({ error: "Failed to fetch weather data" });

    res.json(weatherData);
});

app.get('/image', async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City is required" });

    const imageUrl = await getImage(city);
    if (!imageUrl) return res.status(500).json({ error: "Failed to fetch image" });

    res.json({ imageUrl });
});

module.exports = app; 
