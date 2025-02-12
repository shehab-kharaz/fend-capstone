async function getLocationData(city) {
    const username = process.env.GEONAMES_USERNAME;
    const baseURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`;

    try {
        const response = await fetch(baseURL);
        const data = await response.json();

        if (data.geonames.length === 0) {
            throw new Error("Location not found.");
        }

        const location = data.geonames[0];
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
