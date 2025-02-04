import "./styles/style.scss";
import { handleFormSubmission } from "./js/formHandler";
import { displaySavedTrips } from "./js/updateUI";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("travel-form").addEventListener("submit", handleFormSubmission);
    displaySavedTrips();
});
