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

    document.body.innerHTML = printContent; 
    window.print(); 
    document.body.innerHTML = originalContent; 
}
