// app/db/tests/dev/todoService.js

const Origin = {
    find: async (query) => {
        return [
            { _id: '1', country: 'France', region: 'Normandy', village: 'Camembert', history: 'Camembert is a famous cheese from the Normandy region of France.' },
            { _id: '2', country: 'Italy', region: 'Tuscany', village: 'Pienza', history: 'Pienza is known for its Pecorino cheese.' }
        ];
    },
    findById: async (id) => {
        return { _id: id, country: 'France', region: 'Normandy', village: 'Camembert', history: 'Camembert is a famous cheese from the Normandy region of France.' };
    }
};

const RelatedCheese = {
    find: async (query) => {
        return [
            { _id: '1', name: 'Brie', relationType: 'similar' },
            { _id: '2', name: 'Camembert', relationType: 'similar' },
            { _id: '3', name: 'Roquefort', relationType: 'different' },
            { _id: '4', name: 'Mozzarella', relationType: 'different' }
        ];
    },
    findById: async (id) => {
        return { _id: id, name: 'Brie', relationType: 'similar' };
    },
    countDocuments: async () => {
        return 4;
    }
};

const Taste = {
    find: async (query) => {
        return [
            { _id: '1', flavor: 'Mild', texture: 'Creamy', aroma: 'Subtle', pairings: ['White Wine', 'Grapes'] },
            { _id: '2', flavor: 'Sharp', texture: 'Crumbly', aroma: 'Strong', pairings: ['Red Wine', 'Apples'] }
        ];
    },
    findById: async (id) => {
        return { _id: id, flavor: 'Mild', texture: 'Creamy', aroma: 'Subtle', pairings: ['White Wine', 'Grapes'] };
    }
};

const getAllCheeseOrigins = async (query = {}) => {
    try {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = query.sortBy || 'country';
        const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
        const select = query.select ? query.select.split(',') : [];

        let origins = await Origin.find({});

        // Apply sorting
        origins.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -sortOrder;
            if (a[sortBy] > b[sortBy]) return sortOrder;
            return 0;
        });

        // Apply pagination
        origins = origins.slice(skip, skip + limit);

        // Apply select
        if (select.length > 0) {
            origins = origins.map(origin => 
                Object.fromEntries(
                    Object.entries(origin).filter(([key]) => select.includes(key))
                )
            );
        }

        // Log the pagination and sorting details for debugging
        console.log(`Page: ${page}, Limit: ${limit}, Skipped: ${skip}`);
        console.log(`Sorting By: ${sortBy}, Order: ${sortOrder === 1 ? 'Ascending' : 'Descending'}`);
        console.log(`Origins Returned: ${origins.length}`);

        return { 
            data: origins,
            total: await Origin.find({}).length,
            page,
            limit,
            skip,
            sortBy,
            sortOrder: sortOrder === 1 ? 'Ascending' : 'Descending'
        };
    } catch (error) {
        console.error('Error fetching all cheese origins:', error);
        return undefined;
    }
};

const getCheeseOriginById = async (id) => {
    try {
        const origin = await Origin.findById(id);
        return { data: origin };
    } catch (error) {
        console.error(`Error fetching cheese origin by ID: ${id}`, error);
        return undefined;
    }
};

const getAllRelatedCheeses = async (query = {}) => {
    try {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = query.sortBy || 'name';
        const sortOrder = query.sortOrder === 'desc' ? -1 : 1;

        let relatedCheeses = await RelatedCheese.find({});

        // Apply sorting
        relatedCheeses.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -sortOrder;
            if (a[sortBy] > b[sortBy]) return sortOrder;
            return 0;
        });

        // Apply pagination
        relatedCheeses = relatedCheeses.slice(skip, skip + limit);

        // Log the pagination and sorting details for debugging
        console.log(`Page: ${page}, Limit: ${limit}, Skipped: ${skip}`);
        console.log(`Sorting By: ${sortBy}, Order: ${sortOrder === 1 ? 'Ascending' : 'Descending'}`);
        console.log(`Cheeses Returned: ${relatedCheeses.length}`);

        return { 
            data: relatedCheeses,
            total: await RelatedCheese.countDocuments(),
            page,
            limit,
            skip,
            sortBy,
            sortOrder: sortOrder === 1 ? 'Ascending' : 'Descending'
        };
    } catch (error) {
        console.error('Error fetching all related cheeses:', error);
        return undefined;
    }
};

const getRelatedCheeseById = async (id) => {
    try {
        const relatedCheese = await RelatedCheese.findById(id);
        return { data: relatedCheese };
    } catch (error) {
        console.error(`Error fetching related cheese by ID: ${id}`, error);
        return undefined;
    }
};

const getAllCheeseTastes = async (query = {}) => {
    try {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const sortBy = query.sortBy || 'flavor';
        const sortOrder = query.sortOrder === 'desc' ? -1 : 1;

        let tastes = await Taste.find({});

        // Apply sorting
        tastes.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -sortOrder;
            if (a[sortBy] > b[sortBy]) return sortOrder;
            return 0;
        });

        // Apply pagination
        tastes = tastes.slice(skip, skip + limit);

        // Log the pagination and sorting details for debugging
        console.log(`Page: ${page}, Limit: ${limit}, Skipped: ${skip}`);
        console.log(`Sorting By: ${sortBy}, Order: ${sortOrder === 1 ? 'Ascending' : 'Descending'}`);
        console.log(`Tastes Returned: ${tastes.length}`);

        return { 
            data: tastes,
            total: await Taste.find({}).length,
            page,
            limit,
            skip,
            sortBy,
            sortOrder: sortOrder === 1 ? 'Ascending' : 'Descending'
        };
    } catch (error) {
        console.error('Error fetching all cheese tastes:', error);
        return undefined;
    }
};

const getCheeseTasteById = async (id) => {
    try {
        const taste = await Taste.findById(id);
        return { data: taste };
    } catch (error) {
        console.error(`Error fetching cheese taste by ID: ${id}`, error);
        return undefined;
    }
};

module.exports = {
    getAllCheeseOrigins,
    getCheeseOriginById,
    getAllRelatedCheeses,
    getRelatedCheeseById,
    getAllCheeseTastes,
    getCheeseTasteById
};