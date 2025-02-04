export function validateInput(destination, departureDate) {
  destination = destination.trim();

  if (!destination || !departureDate) {
      alert("Please enter both a valid destination and a departure date.");
      return false;
  }

  const today = new Date().toISOString().split("T")[0];
  if (departureDate < today) {
      alert("Please select a future departure date.");
      return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(destination)) {
      alert("Please enter a valid city name.");
      return false;
  }

  return true;
}
