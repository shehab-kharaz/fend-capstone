import { jsPDF } from "jspdf";

/**
 * Generates and exports a trip summary as a PDF file.
 *
 * @param {Object} trip - The trip details.
 */
export function exportTripToPDF(trip) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Trip Details`, 20, 20);
    doc.setFontSize(12);

    // Add trip information to the PDF
    doc.text(`Destination: ${trip.city}, ${trip.country}`, 20, 40);
    doc.text(`Departure Date: ${trip.date}`, 20, 50);
    doc.text(`Weather: ${trip.weather.description}, ${trip.weather.temperature}°C`, 20, 60);
    
    // Save the PDF file with a filename based on the trip city
    doc.save(`Trip-${trip.city}.pdf`);
}
