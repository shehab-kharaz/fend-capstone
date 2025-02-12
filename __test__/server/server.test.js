const request = require('supertest');
const server = require('../../src/server/server'); 

jest.mock('../../src/server/geonamesAPI', () => jest.fn());
jest.mock('../../src/server/weatherbitAPI', () => jest.fn());
jest.mock('../../src/server/pixabayAPI', () => jest.fn());

const getLocationData = require('../../src/server/geonamesAPI');
const getWeatherData = require('../../src/server/weatherbitAPI');
const getImage = require('../../src/server/pixabayAPI');

describe('API Endpoints', () => {
    afterAll(() => {
        server.close();
    });

    describe('/location', () => {
        it('should return location data when valid city is provided', async () => {
            getLocationData.mockResolvedValue({ lat: 40.7128, lon: -74.0060 });

            const response = await request(server).get('/location?city=New York');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ lat: 40.7128, lon: -74.0060 });
        });

        it('should return 400 if no city is provided', async () => {
            const response = await request(server).get('/location');
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "City is required" });
        });

        it('should return 500 if location data fetch fails', async () => {
            getLocationData.mockResolvedValue(null);

            const response = await request(server).get('/location?city=InvalidCity');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Failed to fetch location data" });
        });
    });

    describe('/weather', () => {
        it('should return weather data when valid parameters are provided', async () => {
            getWeatherData.mockResolvedValue({ temp: 25, description: "Sunny" });

            const response = await request(server).get('/weather?lat=40.7128&lon=-74.0060&date=2025-06-01');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ temp: 25, description: "Sunny" });
        });

        it('should return 400 if missing parameters', async () => {
            const response = await request(server).get('/weather?lat=40.7128');
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "Latitude, longitude, and date are required" });
        });

        it('should return 500 if weather data fetch fails', async () => {
            getWeatherData.mockResolvedValue(null);

            const response = await request(server).get('/weather?lat=40.7128&lon=-74.0060&date=2025-06-01');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Failed to fetch weather data" });
        });
    });

    describe('/image', () => {
        it('should return image URL when valid city is provided', async () => {
            getImage.mockResolvedValue("https://example.com/image.jpg");

            const response = await request(server).get('/image?city=New York');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ imageUrl: "https://example.com/image.jpg" });
        });

        it('should return 400 if no city is provided', async () => {
            const response = await request(server).get('/image');
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "City is required" });
        });

        it('should return 500 if image fetch fails', async () => {
            getImage.mockResolvedValue(null);

            const response = await request(server).get('/image?city=UnknownCity');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Failed to fetch image" });
        });
    });
});
