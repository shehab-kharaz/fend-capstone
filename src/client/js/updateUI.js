export function updateUI(city, country, date, weather, imageUrl) {
  document.getElementById("weather-info").innerHTML = `
      <strong>Destination:</strong> ${city}, ${country} <br>
      <strong>Departure Date:</strong> ${date} <br>
      <strong>Weather:</strong> ${weather.description}, ${weather.temperature}°C
  `;

  const imageElement = document.getElementById("location-image");
  imageElement.src = imageUrl;
  imageElement.style.display = "block";
}
