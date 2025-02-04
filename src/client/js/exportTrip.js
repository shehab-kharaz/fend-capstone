import { jsPDF } from "jspdf";

export function exportTripToPDF(trip) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Trip Details`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Destination: ${trip.city}, ${trip.country}`, 20, 40);
    doc.text(`Departure Date: ${trip.date}`, 20, 50);
    doc.text(`Weather: ${trip.weather.description}, ${trip.weather.temperature}°C`, 20, 60);
    doc.save(`Trip-${trip.city}.pdf`);
}
