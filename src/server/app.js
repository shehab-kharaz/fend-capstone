const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const  getLocationData = require('./geonamesAPI');
const  getWeatherData = require('./weatherbitAPI');
const  getImage = require('./pixabayAPI');

dotenv.config(); 

const app = express();

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.static('dist')); // Serve static files from the 'dist' directory


/**
 * Route: GET /location
 * Fetches latitude, longitude, and country data for a given city.
 *
 * @query {string} city - The name of the city.
 * @returns {Object} - JSON response containing latitude, longitude, and country name.
 *                     Returns an error message if the city is missing or the request fails.
 */
app.get('/location', async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    const locationData = await getLocationData(city);
    if (!locationData) return res.status(500).json({ error: "Failed to fetch location data" });

    res.json(locationData);
});

/**
 * Route: GET /weather
 * Fetches weather data for a specific latitude, longitude, and date.
 *
 * @query {number} lat - Latitude of the location.
 * @query {number} lon - Longitude of the location.
 * @query {string} date - The date for which weather data is requested.
 * @returns {Object} - JSON response containing temperature and weather description.
 *                     Returns an error message if parameters are missing or the request fails.
 */
app.get('/weather', async (req, res) => {
    const { lat, lon, date } = req.query;
    if (!lat || !lon || !date) {
        return res.status(400).json({ error: "Latitude, longitude, and date are required" });
    }

    const isFuture = new Date(date) > new Date(); // Determine if the requested date is in the future
    const weatherData = await getWeatherData(lat, lon, isFuture);

    if (!weatherData) return res.status(500).json({ error: "Failed to fetch weather data" });

    res.json(weatherData);
});

/**
 * Route: GET /image
 * Fetches an image URL of a given city from the Pixabay API.
 *
 * @query {string} city - The name of the city.
 * @returns {Object} - JSON response containing the image URL.
 *                     Returns an error message if the city is missing or the request fails.
 */
app.get('/image', async (req, res) => {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City is required" });

    const imageUrl = await getImage(city);
    if (!imageUrl) return res.status(500).json({ error: "Failed to fetch image" });

    res.json({ imageUrl });
});

module.exports = app; 
