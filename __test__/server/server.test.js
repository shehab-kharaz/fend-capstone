const request = require('supertest');
const app = require('../../src/server/app'); 

jest.mock('../../src/server/geonamesAPI', () => ({
    default: jest.fn().mockResolvedValue({ lat: 40.7128, lon: -74.0060 })
}));

jest.mock('../../src/server/weatherbitAPI', () => ({
    default: jest.fn().mockResolvedValue({ temperature: 25, condition: "Clear" })
}));

jest.mock('../../src/server/pixabayAPI', () => ({
    default: jest.fn().mockResolvedValue("https://sampleimage.com/image.jpg")
}));

describe("Express API Endpoints", () => {

    test("GET /location should return location data", async () => {
        const response = await request(app).get('/location?city=New York');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("lat");
        expect(response.body).toHaveProperty("lon");
    });

    test("GET /location should return 400 if city is missing", async () => {
        const response = await request(app).get('/location');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("City is required");
    });

    test("GET /weather should return weather data", async () => {
        const response = await request(app).get('/weather?lat=40.7128&lon=-74.0060&date=2025-12-01');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("temperature");
        expect(response.body).toHaveProperty("condition");
    });

    test("GET /weather should return 400 if parameters are missing", async () => {
        const response = await request(app).get('/weather');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Latitude, longitude, and date are required");
    });

    test("GET /image should return an image URL", async () => {
        const response = await request(app).get('/image?city=New York');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("imageUrl");
        expect(response.body.imageUrl).toContain("https://");
    });

    test("GET /image should return 400 if city is missing", async () => {
        const response = await request(app).get('/image');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("City is required");
    });
});