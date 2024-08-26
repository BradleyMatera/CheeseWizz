const {
    getAllCheeseOrigins,
    getCheeseOriginById,
    getAllRelatedCheeses,
    getRelatedCheeseById,
    getAllCheeseTastes,
    getCheeseTasteById
} = require('./todoService');

describe('Cheese Service Tests', () => {
    // Assignment: "Write a test for your API with the endpoint that returns limited data based on a query string and select."
    test('should return limited data based on query string and select for getAllCheeseOrigins', async () => {
        const result = await getAllCheeseOrigins({ limit: 2, select: 'country,region' });
        expect(result).toBeDefined();
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBeLessThanOrEqual(2); // Check limit
        expect(result.data[0]).toHaveProperty('country');
        expect(result.data[0]).toHaveProperty('region');
        expect(result.data[0]).not.toHaveProperty('village'); // Check select
        console.log(`Origins Returned: ${result.data.length}`); // Log for debugging
    });

    // Assignment: "Write a test for your API that returns the pagination of the collection. Test the skip and limit of the endpoint."
    test('should return paginated data with correct skip and limit for getAllRelatedCheeses', async () => {
        const page = 2;
        const limit = 2;
        const result = await getAllRelatedCheeses({ page, limit });
        expect(result).toBeDefined();
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBeLessThanOrEqual(limit);
        expect(result.page).toBe(page);
        expect(result.limit).toBe(limit);
        // Log the pagination details for debugging
        console.log(`Page: ${result.page}, Limit: ${result.limit}, Skipped: ${(page - 1) * limit}`);
        console.log(`Cheeses Returned: ${result.data.length}`);
    });

    // Assignment: "Write a test for the endpoint that returns your collection sorted. Test the sort in both directions."
    test('should return sorted data in ascending order for getAllCheeseTastes', async () => {
        const result = await getAllCheeseTastes({ sortBy: 'flavor', sortOrder: 'asc' });
        expect(result).toBeDefined();
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.sortBy).toBe('flavor');
        expect(result.sortOrder).toBe('Ascending');
        // Check if data is sorted in ascending order
        for (let i = 1; i < result.data.length; i++) {
            expect(result.data[i].flavor >= result.data[i-1].flavor).toBeTruthy();
        }
        console.log(`Sorting By: ${result.sortBy}, Order: ${result.sortOrder}`);
    });

    test('should return sorted data in descending order for getAllCheeseTastes', async () => {
        const result = await getAllCheeseTastes({ sortBy: 'flavor', sortOrder: 'desc' });
        expect(result).toBeDefined();
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBeGreaterThan(1);
        expect(result.sortBy).toBe('flavor');
        expect(result.sortOrder).toBe('Descending');
        // Check if data is sorted in descending order
        for (let i = 1; i < result.data.length; i++) {
            expect(result.data[i].flavor <= result.data[i-1].flavor).toBeTruthy();
        }
        console.log(`Sorting By: ${result.sortBy}, Order: ${result.sortOrder}`);
    });

    test('should fetch a specific cheese origin by ID', async () => {
        const allOrigins = await getAllCheeseOrigins();
        const testId = allOrigins.data[0]._id;
        const result = await getCheeseOriginById(testId);
        expect(result).toBeDefined();
        expect(result.data).toHaveProperty('_id', testId);
    });

    test('should fetch a specific related cheese by ID', async () => {
        const allRelatedCheeses = await getAllRelatedCheeses();
        const testId = allRelatedCheeses.data[0]._id;
        const result = await getRelatedCheeseById(testId);
        expect(result).toBeDefined();
        expect(result.data).toHaveProperty('_id', testId);
    });

    test('should fetch a specific cheese taste by ID', async () => {
        const allTastes = await getAllCheeseTastes();
        const testId = allTastes.data[0]._id;
        const result = await getCheeseTasteById(testId);
        expect(result).toBeDefined();
        expect(result.data).toHaveProperty('_id', testId);
    });
});
// Commented out working mock tests
/*
// Mock the modules
jest.mock('./todoService');

describe('Mocked Cheese Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Assignment: "Write a test for your API with the endpoint that returns limited data based on a query string and select."
    test('should return limited data based on query string and select for getAllCheeseOrigins', async () => {
        const mockOrigins = [
            { _id: '1', country: 'France', region: 'Normandy' },
            { _id: '2', country: 'Italy', region: 'Tuscany' }
        ];
        getAllCheeseOrigins.mockResolvedValue({ 
            data: mockOrigins,
            total: 2,
            page: 1,
            limit: 2,
            skip: 0,
            sortBy: 'country',
            sortOrder: 'Ascending'
        });

        const result = await getAllCheeseOrigins({ limit: 2, select: 'country,region' });
        
        expect(result.data).toHaveLength(2);
        expect(result.data[0]).toHaveProperty('country');
        expect(result.data[0]).toHaveProperty('region');
        expect(result.data[0]).not.toHaveProperty('village');
        expect(result.limit).toBe(2);
    });

    // Assignment: "Write a test for your API that returns the pagination of the collection. Test the skip and limit of the endpoint."
    test('should return paginated data with correct skip and limit for getAllRelatedCheeses', async () => {
        const mockCheeses = [
            { _id: '3', name: 'Gouda' },
            { _id: '4', name: 'Edam' }
        ];
        getAllRelatedCheeses.mockImplementation((query) => {
            const page = query.page || 1;
            const limit = query.limit || 10;
            const skip = (page - 1) * limit;
            console.log(`Page: ${page}, Limit: ${limit}, Skipped: ${skip}`);
            console.log(`Sorting By: ${query.sortBy}, Order: ${query.sortOrder}`);
            console.log(`Cheeses Returned: ${mockCheeses.length}`);

            return Promise.resolve({ 
                data: mockCheeses, 
                total: 10, 
                page: page, 
                limit: limit,
                skip: skip,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder
            });
        });

        const result = await getAllRelatedCheeses({ page: 2, limit: 2, sortBy: 'name', sortOrder: 'asc' });

        expect(result.data).toHaveLength(2);
        expect(result.total).toBe(10);
        expect(result.page).toBe(2);
        expect(result.limit).toBe(2);
        expect(result.skip).toBe(2);
        expect(result.sortBy).toBe('name');
        expect(result.sortOrder).toBe('asc');
    });

    // Assignment: "Write a test for the endpoint that returns your collection sorted. Test the sort in both directions."
    test('should return sorted data in ascending order for getAllCheeseTastes', async () => {
        const mockTastes = [
            { _id: '1', flavor: 'Mild' },
            { _id: '2', flavor: 'Sharp' }
        ];
        getAllCheeseTastes.mockResolvedValue({ 
            data: mockTastes,
            total: 2,
            page: 1,
            limit: 10,
            skip: 0,
            sortBy: 'flavor',
            sortOrder: 'Ascending'
        });

        const result = await getAllCheeseTastes({ sortBy: 'flavor', sortOrder: 'asc' });
        
        expect(result.data[0].flavor).toBe('Mild');
        expect(result.data[1].flavor).toBe('Sharp');
        expect(result.sortBy).toBe('flavor');
        expect(result.sortOrder).toBe('Ascending');
    });

    test('should return sorted data in descending order for getAllCheeseTastes', async () => {
        const mockTastes = [
            { _id: '2', flavor: 'Sharp' },
            { _id: '1', flavor: 'Mild' }
        ];
        getAllCheeseTastes.mockResolvedValue({ 
            data: mockTastes,
            total: 2,
            page: 1,
            limit: 10,
            skip: 0,
            sortBy: 'flavor',
            sortOrder: 'Descending'
        });

        const result = await getAllCheeseTastes({ sortBy: 'flavor', sortOrder: 'desc' });
        
        expect(result.data[0].flavor).toBe('Sharp');
        expect(result.data[1].flavor).toBe('Mild');
        expect(result.sortBy).toBe('flavor');
        expect(result.sortOrder).toBe('Descending');
    });
    /*/