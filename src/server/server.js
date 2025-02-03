const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const getLocationData = require('./geonamesAPI').default;
const getWeatherData = require('./weatherbitAPI').default;


dotenv.config(); 
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist')); 

app.get('/location', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    const locationData = await getLocationData(city);
    if (!locationData) {
        return res.status(500).json({ error: "Failed to fetch location data" });
    }

    res.json(locationData);
});


app.get('/weather', async (req, res) => {
    const { lat, lon, date } = req.query;
    if (!lat || !lon || !date) {
        return res.status(400).json({ error: "Latitude, longitude, and date are required" });
    }

    const isFuture = new Date(date) > new Date(); 
    const weatherData = await getWeatherData(lat, lon, isFuture);

    if (!weatherData) {
        return res.status(500).json({ error: "Failed to fetch weather data" });
    }

    res.json(weatherData);
});


const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server runing on ${PORT}`);
});
