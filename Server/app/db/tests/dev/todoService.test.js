const { 
    getAllCheeseOrigins, 
    getCheeseOriginById, 
    getAllRelatedCheeses, 
    getRelatedCheeseById, 
    getAllCheeseTastes, 
    getCheeseTasteById 
} = require('./todoService'); // Importing the service functions

describe('Cheese Service Tests', () => {
    let testId; // Variable to store the ID of a cheese, origin, or taste for testing specific item retrieval

    // Test for fetching all cheese origins
    // Problem faced: Initially, the response structure wasn't being validated, leading to issues in later tests.
    // Solution: We added checks to ensure that the response contains a 'data' property, that 'data' is an array, and that it contains at least one item.
    test('should fetch all cheese origins', async () => {
        const result = await getAllCheeseOrigins(); // Call the service function to get all cheese origins
        expect(result).toHaveProperty('data'); // Ensure the 'data' property exists in the response
        expect(result.data).toBeInstanceOf(Array); // Check that 'data' is an array
        expect(result.data.length).toBeGreaterThan(0); // Ensure there's at least one item in the array

        // Display the first 3 cheese origins in the console for visual confirmation during test runs
        console.log('First 3 Cheese Origins:', result.data.slice(0, 3));

        testId = result.data[0]._id; // Store the ID of the first item for use in subsequent tests
    });

    // Test for fetching a specific cheese origin by ID
    // Problem faced: There were errors when testing with invalid IDs or when no data was returned.
    // Solution: We ensured that the service handles cases where no data is found and that tests verify the presence of the correct ID.
    test('should fetch a specific cheese origin by ID', async () => {
        const result = await getCheeseOriginById(testId); // Call the service function to get a specific cheese origin by ID
        expect(result).toHaveProperty('data'); // Ensure the 'data' property exists in the response
        expect(result.data).toHaveProperty('_id', testId); // Ensure the fetched item has the expected ID
    });

    // Test for fetching all related cheeses
    // Problem faced: Similar to origins, validating the structure of the response was necessary to prevent future issues.
    // Solution: Added checks for the 'data' property, verified it's an array, and ensured it contains data.
    test('should fetch all related cheeses', async () => {
        const result = await getAllRelatedCheeses(); // Call the service function to get all related cheeses
        expect(result).toHaveProperty('data'); // Ensure the 'data' property exists in the response
        expect(result.data).toBeInstanceOf(Array); // Check that 'data' is an array
        expect(result.data.length).toBeGreaterThan(0); // Ensure there's at least one item in the array

        // Display the first 3 related cheeses in the console for visual confirmation during test runs
        console.log('First 3 Related Cheeses:', result.data.slice(0, 3));

        testId = result.data[0]._id; // Store the ID of the first item for use in subsequent tests
    });

    // Test for fetching a specific related cheese by ID
    // Problem faced: Similar to the previous ID-based tests, handling cases where the ID might be invalid or missing was critical.
    // Solution: Added validation checks to ensure that the correct data is retrieved and properly handled in the tests.
    test('should fetch a specific related cheese by ID', async () => {
        const result = await getRelatedCheeseById(testId); // Call the service function to get a specific related cheese by ID
        expect(result).toHaveProperty('data'); // Ensure the 'data' property exists in the response
        expect(result.data).toHaveProperty('_id', testId); // Ensure the fetched item has the expected ID
    });

    // Test for fetching all cheese tastes
    // Problem faced: Ensuring that the response structure was consistent across different API endpoints was crucial to avoid test failures.
    // Solution: Consistently applied checks across all "get all" functions to verify that the structure is correct and that the array contains data.
    test('should fetch all cheese tastes', async () => {
        const result = await getAllCheeseTastes(); // Call the service function to get all cheese tastes
        expect(result).toHaveProperty('data'); // Ensure the 'data' property exists in the response
        expect(result.data).toBeInstanceOf(Array); // Check that 'data' is an array
        expect(result.data.length).toBeGreaterThan(0); // Ensure there's at least one item in the array

        // Display the first 3 cheese tastes in the console for visual confirmation during test runs
        console.log('First 3 Cheese Tastes:', result.data.slice(0, 3));

        testId = result.data[0]._id; // Store the ID of the first item for use in subsequent tests
    });

    // Test for fetching a specific cheese taste by ID
    // Problem faced: Handling errors when IDs did not correspond to valid records was a key focus.
    // Solution: Added checks to ensure the correct data is retrieved and that the tests properly verify the presence of the expected ID.
    test('should fetch a specific cheese taste by ID', async () => {
        const result = await getCheeseTasteById(testId); // Call the service function to get a specific cheese taste by ID
        expect(result).toHaveProperty('data'); // Ensure the 'data' property exists in the response
        expect(result.data).toHaveProperty('_id', testId); // Ensure the fetched item has the expected ID
    });
});