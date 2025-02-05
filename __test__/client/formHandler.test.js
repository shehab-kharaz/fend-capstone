import { handleFormSubmission } from "../../src/client/js/formHandler";
import { updateUI } from "../../src/client/js/updateUI";
import { validateInput } from "../../src/client/js/validateInput";

jest.mock("../../src/client/js/updateUI");
jest.mock("../../src/client/js/validateInput");

global.fetch = jest.fn();

describe("handleFormSubmission", () => {
    let event;

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="trip-form">
                <input id="destination" value="Paris" />
                <input id="departure-date" value="2025-05-10" />
            </form>
        `;

        event = { preventDefault: jest.fn() };
        validateInput.mockReturnValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call updateUI with correct data when API calls succeed", async () => {
        fetch
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue({
                    lat: 48.8566,
                    lon: 2.3522,
                    country: "France",
                }),
            })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue({
                    temperature: 20,
                    description: "Sunny",
                }),
            })
            .mockResolvedValueOnce({
                json: jest.fn().mockResolvedValue({
                    imageUrl: "https://example.com/paris.jpg",
                }),
            });

        await handleFormSubmission(event);

        expect(fetch).toHaveBeenCalledTimes(3);
        expect(updateUI).toHaveBeenCalledWith(
            "Paris",
            "France",
            "2025-05-10",
            { temperature: 20, description: "Sunny" },
            "https://example.com/paris.jpg"
        );
    });

    it("should alert the user on fetch failure", async () => {
        fetch.mockRejectedValue(new Error("API failure"));

        global.alert = jest.fn();

        await handleFormSubmission(event);

        expect(alert).toHaveBeenCalledWith("Failed to retrieve trip details. Please try again.");
    });

    it("should return early if input validation fails", async () => {
        validateInput.mockReturnValue(false);

        await handleFormSubmission(event);

        expect(fetch).not.toHaveBeenCalled();
        expect(updateUI).not.toHaveBeenCalled();
    });
});
