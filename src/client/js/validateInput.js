/**
 * Validates user input for destination and departure date.
 *
 * @param {string} destination - The user-provided destination city.
 * @param {string} departureDate - The user-provided departure date.
 * @returns {boolean} - Returns `true` if input is valid, otherwise `false`.
 */
export function validateInput(destination, departureDate) {
  destination = destination.trim();

  if (!destination || !departureDate) {
      alert("Please enter both a valid destination and a departure date.");
      return false;
  }

  // Ensure the departure date is in the future
  const today = new Date().toISOString().split("T")[0];  // Get today's date
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
