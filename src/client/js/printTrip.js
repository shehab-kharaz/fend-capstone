/**
 * Prints the trip details by temporarily modifying the webpage content.
 *
 * @param {Object} trip - The trip details.
 */
export function printTrip(trip) {
    const originalContent = document.body.innerHTML; 

    const printContent = `
        <div>
            <h2>${trip.city}, ${trip.country}</h2>
            <p><strong>Departure Date:</strong> ${trip.date}</p>
            <p><strong>Weather:</strong> ${trip.weather.description}, ${trip.weather.temperature}°C</p>
            <img src="${trip.imageUrl}" width="200">
        </div>
    `;

    document.body.innerHTML = printContent; // Replace the page content with printable content
    window.print(); // Open the browser's print dialog
    document.body.innerHTML = originalContent; // Restore the original page content after printing 
}
