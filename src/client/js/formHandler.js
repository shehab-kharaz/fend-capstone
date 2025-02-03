function handleFormSubmission(event) {
  event.preventDefault();

  const destination = document.getElementById("destination").value;
  const departureDate = document.getElementById("departure-date").value;

  if (!destination || !departureDate) {
      alert("Please enter both destination and departure date.");
      return;
  }

  console.log("Form Submitted:", { destination, departureDate });
  document.getElementById("weather-info").innerText = `Searching for weather in ${destination}...`;
}

export { handleFormSubmission }
