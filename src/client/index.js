import "./styles/style.scss";
import { handleFormSubmission } from "./js/formHandler";
import { displaySavedTrips } from "./js/updateUI";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("travel-form").addEventListener("submit", handleFormSubmission);
    displaySavedTrips();
});

window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
});

