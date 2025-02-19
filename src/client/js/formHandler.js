import { updateUI } from "./updateUI";
import { validateInput } from "./validateInput";

const BACKEND_URL = "http://localhost:8081"; 


/**
 * Handles the form submission, fetches trip details and updates the UI accordingly.
 *
 * @param {Event} event - The form submission event.
 */
export async function handleFormSubmission(event) {
    event.preventDefault();

    const destination = document.getElementById("destination").value;
    const departureDate = document.getElementById("departure-date").value;

    if (!validateInput(destination, departureDate)) {
        return;
    }

    try {
        // Fetch location data based on the destination
        console.log("Fetching location data...");
        const locationResponse = await fetch(`${BACKEND_URL}/location?city=${destination}`);
        const locationData = await locationResponse.json();
        console.log("Location Data:", locationData);

        if (locationData.error) {
            throw new Error(locationData.error);
        }

        const { lat, lon, country } = locationData;

        // Fetch weather data using the retrieved latitude and longitude
        console.log("Fetching weather data...");
        const weatherResponse = await fetch(`${BACKEND_URL}/weather?lat=${lat}&lon=${lon}&date=${departureDate}`);
        const weatherData = await weatherResponse.json();
        console.log("Weather Data:", weatherData);

        if (weatherData.error) {
            throw new Error(weatherData.error);
        }

        // Fetch an image of the destination
        console.log("Fetching image data...");
        const imageResponse = await fetch(`${BACKEND_URL}/image?city=${destination}`);
        const imageData = await imageResponse.json();
        console.log("Image Data:", imageData);

        if (imageData.error) {
            throw new Error(imageData.error);
        }

        // Update the UI with the fetched trip details
        updateUI(destination, country, departureDate, weatherData, imageData.imageUrl);

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to retrieve trip details. Please try again.");
    }
}
