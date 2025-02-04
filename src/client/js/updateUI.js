import { printTrip } from "./printTrip";
import { exportTripToPDF } from "./exportTrip";

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

function saveTripToLocalStorage(trip) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.push(trip);
    localStorage.setItem("trips", JSON.stringify(trips));
}

export function displaySavedTrips() {
    const tripsContainer = document.getElementById("saved-trips");
    tripsContainer.innerHTML = ""; 

    const trips = JSON.parse(localStorage.getItem("trips")) || [];
    
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
        tripsContainer.appendChild(tripElement);
    });
}

window.removeTrip = function(index) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.splice(index, 1);
    localStorage.setItem("trips", JSON.stringify(trips));
    displaySavedTrips();
};

window.handlePrintTrip = function(index) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    printTrip(trips[index]);
};

window.handleExportTrip = function(index) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    exportTripToPDF(trips[index]);
};
