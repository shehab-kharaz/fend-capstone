import { printTrip } from "./printTrip";
import { exportTripToPDF } from "./exportTrip";

/**
 * Updates the UI by saving the trip data to local storage and displaying the saved trips.
 *
 * @param {string} city - The destination city.
 * @param {string} country - The destination country.
 * @param {string} date - The departure date.
 * @param {Object} weather - The weather information for the trip.
 * @param {string} imageUrl - The URL of an image representing the destination.
 */
export function updateUI(city, country, date, weather, imageUrl) {
    const tripData = {
        city,
        country,
        date,
        weather,
        imageUrl
    };

    saveTripToLocalStorage(tripData);
    displaySavedTrips();
}

/**
 * Saves a trip to local storage.
 *
 * @param {Object} trip - The trip details to be saved.
 */
function saveTripToLocalStorage(trip) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.push(trip);
    localStorage.setItem("trips", JSON.stringify(trips));
}

/**
 * Displays all saved trips in the UI.
 * Retrieves trips from local storage and generates UI elements for each trip.
 */
export function displaySavedTrips() {
    const tripsContainer = document.getElementById("saved-trips");
    tripsContainer.innerHTML = ""; 

    const trips = JSON.parse(localStorage.getItem("trips")) || [];
    
    // Iterate through trips and create UI elements for each one
    trips.forEach((trip, index) => {
        const tripElement = document.createElement("div");
        tripElement.classList.add("trip-entry");
        tripElement.innerHTML = `
            <p><strong>${trip.city}, ${trip.country}</strong> - ${trip.date}</p>
            <p>${trip.weather.description}, ${trip.weather.temperature}°C</p>
            <img src="${trip.imageUrl}" alt="${trip.city}" width="100">
            <div>
                <button onclick="removeTrip(${index})">Remove</button>
                <button onclick="handlePrintTrip(${index})">Print</button>
                <button onclick="handleExportTrip(${index})">Export to PDF</button>
            <div>
        `;
        tripsContainer.appendChild(tripElement); // Append trip element to the container
    });
}

/**
 * Removes a trip from local storage and updates the UI.
 *
 * @param {number} index - The index of the trip to remove.
 */
window.removeTrip = function(index) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.splice(index, 1);
    localStorage.setItem("trips", JSON.stringify(trips));
    displaySavedTrips();
};

/**
 * Prints the selected trip by retrieving it from local storage.
 *
 * @param {number} index - The index of the trip to print.
 */
window.handlePrintTrip = function(index) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    printTrip(trips[index]);
};


/**
 * Exports the selected trip as a PDF by retrieving it from local storage.
 *
 * @param {number} index - The index of the trip to export.
 */
window.handleExportTrip = function(index) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    exportTripToPDF(trips[index]);
};
