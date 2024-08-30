// Function to fetch a GIF from Giphy based on a search term
export const fetchGif = (searchTerm) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEYS.GIPHY_API_KEY}&q=${searchTerm}&limit=1`;
    
    // Fetch the data from Giphy API
    return fetch(url)
        .then(response => {
            if (!response.ok) { // Check if response is not OK
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse response to JSON
        })
        .then(data => {
            if (data.data && data.data.length > 0) { // Check if there are GIFs in the response
                return data.data[0].images.fixed_height.url; // Return the URL of the first GIF
            }
            throw new Error('No GIFs found'); // Throw an error if no GIFs are found
        })
        .catch(error => {
            console.error('Error fetching GIF:', error); // Log any errors to the console
            return null; // Return null in case of an error
        });
};

// Function to fetch a random image from Unsplash based on a query
export const fetchUnsplashImage = (query) => {
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${API_KEYS.UNSPLASH_ACCESS_KEY}`;
    
    // Fetch the data from Unsplash API
    return fetch(url)
        .then(response => {
            if (!response.ok) { // Check if response is not OK
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse response to JSON
        })
        .catch(error => {
            console.error('Error fetching Unsplash image:', error); // Log any errors to the console
            return { urls: { regular: 'https://via.placeholder.com/400x200?text=Ad+Image' } }; // Return a placeholder image URL in case of an error
        });
};

// Function to translate text using Google Cloud API
export const translateText = (text, targetLanguage) => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEYS.GOOGLE_CLOUD_API_KEY}`;
    
    // Fetch the translation data from Google Cloud API
    return fetch(url, {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify({
            q: text, // Text to be translated
            target: targetLanguage // Target language for translation
        })
    }).then(response => response.json()); // Parse response to JSON
};

// Function to fetch Star Wars characters from SWAPI
export const fetchStarWarsCharacters = () => {
    const url = 'https://swapi.dev/api/people/';
    
    // Fetch the data from SWAPI
    return fetch(url)
        .then(response => {
            if (!response.ok) { // Check if response is not OK
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse response to JSON
        })
        .then(data => data.results) // Return the results from the response data
        .catch(error => {
            console.error('Error fetching Star Wars characters:', error); // Log any errors to the console
            return []; // Return an empty array in case of an error
        });
};

// Function to fetch Star Wars images from the Star Wars Images API
export const fetchStarWarsImages = () => {
    const url = 'https://akabab.github.io/starwars-api/api/all.json';
    
    // Fetch the data from Star Wars Images API
    return fetch(url)
        .then(response => {
            if (!response.ok) { // Check if response is not OK
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse response to JSON
        })
        .catch(error => {
            console.error('Error fetching Star Wars images:', error); // Log any errors to the console
            return []; // Return an empty array in case of an error
        });
};

// Function to fetch content from OpenAI
export const fetchOpenAIContent = (prompt) => {
    const url = 'https://api.openai.com/v1/engines/davinci/completions'; // Correcting the endpoint
    
    // Fetch the data from OpenAI API
    return fetch(url, {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
            'Authorization': `Bearer ${API_KEYS.OPENAI_API_KEY}` // Include the OpenAI API key in the Authorization header
        },
        body: JSON.stringify({
            prompt: prompt, // Prompt to be sent to OpenAI
            max_tokens: 100, // Maximum number of tokens in the response
            temperature: 0.7 // Sampling temperature
        })
    })
    .then(response => {
        if (!response.ok) { // Check if response is not OK
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse response to JSON
    })
    .then(data => data.choices[0].text) // Return the text from the first choice in the response
    .catch(error => {
        console.error('Error fetching OpenAI content:', error); // Log any errors to the console
        return 'Failed to fetch content from OpenAI'; // Return an error message in case of an error
    });
};