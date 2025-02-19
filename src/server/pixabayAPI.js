/**
 * Fetches an image URL of a city using Pixabay API.
 *
 * @param {string} city - The name of the city to search for images.
 * @returns {Promise<string | null>} 
 *          A promise that resolves to the URL of the first matching image,
 *          or null if no image is found or an error occurs.
 */
async function getImage(city) {
    const apiKey = process.env.PIXABAY_API_KEY;
    const baseURL = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(city)}&image_type=photo&category=places&per_page=3`;

    try {
        const response = await fetch(baseURL);
        const data = await response.json();

        if (!data.hits || data.hits.length === 0) {
            throw new Error("No images found.");
        }

        return data.hits[0].webformatURL; 
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
}

module.exports = getImage;
