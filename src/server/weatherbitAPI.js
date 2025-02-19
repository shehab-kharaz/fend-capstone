/**
 * Fetches weather data for a given latitude and longitude.
 *
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @param {boolean} isFuture - Determines whether to fetch future forecast or current weather.
 * @returns {Promise<{temperature: number, description: string} | null>} 
 *          A promise that resolves to an object containing temperature and weather description,
 *          or null if an error occurs.
 */
async function getWeatherData(lat, lon, isFuture) {
    const apiKey = process.env.WEATHERBIT_API_KEY;

    // Determine API endpoint based on whether we're fetching current or future weather
    const baseURL = isFuture 
        ? `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=1&key=${apiKey}`
        : `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;

    try {
        const response = await fetch(baseURL);
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            throw new Error("Weather data not found.");
        }

        // Extract relevant weather details from response
        return {
            temperature: data.data[0].temp,
            description: data.data[0].weather.description,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

module.exports = getWeatherData;
