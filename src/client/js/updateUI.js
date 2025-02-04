export function updateUI(city, country, date, weather, imageUrl) {
  const tripData = {
      city,
      country,
      date,
      weather,
      imageUrl
  };

  saveTripToLocalStorage(tripData);

  document.getElementById("weather-info").innerHTML = `
      <strong>Destination:</strong> ${city}, ${country} <br>
      <strong>Departure Date:</strong> ${date} <br>
      <strong>Weather:</strong> ${weather.description}, ${weather.temperature}°C
  `;

  const imageElement = document.getElementById("location-image");
  imageElement.src = imageUrl;
  imageElement.style.display = "block";

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
          <button onclick="removeTrip(${index})">Remove</button>
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

