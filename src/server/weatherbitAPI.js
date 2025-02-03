import fetch from 'node-fetch';

async function getWeatherData(lat, lon, isFuture) {
    const apiKey = process.env.WEATHERBIT_API_KEY;
    const baseURL = isFuture 
        ? `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=1&key=${apiKey}`
        : `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;

    try {
        const response = await fetch(baseURL);
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            throw new Error("Weather data not found.");
        }

        return {
            temperature: data.data[0].temp,
            description: data.data[0].weather.description,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

export default getWeatherData;
