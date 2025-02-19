/**
 * Fetches location data for a given city using GeoNames API.
 *
 * @param {string} city - The name of the city to search for location data.
 * @returns {Promise<{lat: number, lon: number, country: string} | null>} 
 *          A promise that resolves to an object containing latitude, longitude, and country name,
 *          or null if an error occurs or the location is not found.
 */
async function getLocationData(city) {
    const username = process.env.GEONAMES_USERNAME;
    const baseURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;

    try {
        const response = await fetch(baseURL);
        const data = await response.json();

        if (data.geonames.length === 0) {
            throw new Error("Location not found.");
        }

        const location = data.geonames[0]; // Extract the first result
        return {
            lat: location.lat,
            lon: location.lng,
            country: location.countryName
        };
    } catch (error) {
        console.error("Error fetching location data:", error);
        return null;
    }
}

module.exports = getLocationData;
