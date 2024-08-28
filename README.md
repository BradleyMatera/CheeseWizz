# 🧀 CheeseWizz Project

## 📝 Overview

The **CheeseWizz** project is a comprehensive cheese database application designed to manage and retrieve detailed information about various cheeses, origins, tastes, and related cheeses. This project incorporates advanced search functionalities, dynamic query logic, and seamless frontend-backend integration. The application is built with a focus on flexibility, modularity, and efficiency, ensuring users can easily access and interact with the data.

## 🚀 Key Features

### 🔍 Comprehensive Search Functionality

- **Advanced Query Logic with MongoDB**  
  Utilizes MongoDB's `$or` operator to enable logical OR queries across multiple fields, providing flexible and comprehensive search capabilities.

- **Regular Expression Integration**  
  Enables case-insensitive searches and converts spaces in search terms into logical OR conditions (`|`) for more dynamic querying across different fields.

- **Dynamic Search Criteria Builder**  
  A search criteria function dynamically generates query conditions based on the provided search term and selected field, enhancing modularity and reusability.

### 🛠️ Backend Controllers & Collection Management

- **Unified Get-All Functionality**  
  Implemented across all controllers to ensure consistent behavior when retrieving data from different collections (cheeses, origins, tastes, related cheeses).

- **Collection-Specific Queries**  
  Each controller efficiently handles collection-specific queries, ensuring accurate data retrieval and processing.

### 💻 Frontend Integration

- **Modular Search Bar Component**  
  A dynamic search bar allows users to select a collection and enter search terms, interacting seamlessly with the backend.

- **Get-All Feature**  
  Fetches all documents from the selected collection when no specific search term is provided, allowing users to access comprehensive data effortlessly.

### 🔧 Technological Enhancements

- **Advanced MongoDB Querying Methods**  
  Implemented complex query structures using MongoDB's `$or` operator to search across multiple fields within collections. Regular expressions (`RegExp`) were integrated to handle case-insensitive searches and dynamic query building, enabling users to search for terms across various document fields, such as names, origins, tastes, and related cheeses.

- **Dynamic Search Functionality**  
  Developed a reusable search criteria builder function, which dynamically constructs search queries based on user input. This approach supports flexible querying by converting search terms into logical OR conditions, allowing the system to return results that match any of the criteria specified by the user.

- **Modular Code Structuring**  
  Refined the application's architecture to enhance maintainability and scalability. This involved separating concerns across distinct controllers and models for cheeses, origins, tastes, and related cheeses. Each controller now manages its respective collection with consistent logic for CRUD operations and search functionalities, leading to easier updates and testing.

- **Extensive Debugging and Optimization**  
  Addressed and resolved critical issues such as improper API responses and JSON parsing errors. Enhanced the application's performance by streamlining data retrieval processes, reducing response times, and ensuring that all search operations return accurate and relevant results. Regular testing and debugging sessions were conducted to verify the integrity and efficiency of the entire codebase.

### 🎨 Visual Enhancements

- **Custom Shader Background**  
  Implemented a visually appealing shader background using Three.js and React Three Fiber, providing an immersive and dynamic user experience.

- **Responsive Design**  
  Utilized Tailwind CSS for a responsive and modern UI design, ensuring a consistent look across different devices and screen sizes.

## 📂 Project Structure

### 📦 Models

- **Cheese Model**  
  Represents the main cheese collection, storing detailed information about each cheese.

- **Origin Model**  
  Manages origin details, including country, region, village, and history of the cheese.

- **Taste Model**  
  Stores taste-related information like flavor, texture, and aroma.

- **RelatedCheese Model**  
  Handles the relationships between different cheeses.

### 🛠️ Controllers

- **Big Controller (`bigCtrl.js`)**  
  Manages the primary logic for cheese-related operations, including CRUD and search functionality.

- **Origin Controller (`originCtrl.js`)**  
  Handles CRUD operations and search functionality for origins.

- **Taste Controller (`tasteCtrl.js`)**  
  Manages taste-related CRUD operations and search functionality.

- **RelatedCheese Controller (`relatedCtrl.js`)**  
  Deals with CRUD operations and search functionality for related cheeses.

### 🌐 Routes

- **Cheese Routes**  
  `/api/v1/cheeses` - Manages all cheese-related endpoints.

- **Origin Routes**  
  `/api/v1/origins` - Handles endpoints related to origins.

- **Taste Routes**  
  `/api/v1/tastes` - Manages taste-related endpoints.

- **RelatedCheese Routes**  
  `/api/v1/relatedCheeses` - Handles endpoints for related cheeses.

### 🛠️ Utilities

- **Search Criteria Builder (`search.js`)**  
  Enhances modularity and reusability by dynamically generating search query conditions based on user input.

- **Custom Messages (`messages.js`)**  
  Provides consistent and reusable messages for API responses.

### 🖼️ Components

- **DisplayCheeses**  
  Renders the list of cheeses or other collection items with proper formatting and styling.

- **StarShader**  
  Custom shader component for creating an animated starry background effect.

- **ShaderBackground**  
  Wrapper component for applying the custom shader background to the application.

- **ErrorBoundary**  
  React component for catching and handling errors gracefully throughout the application.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cheesewizz.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up the MongoDB connection:**
   - Configure the connection string in your `.env` file.
   - Ensure MongoDB is running and accessible.

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Run the client:**
   ```bash
   cd client
   npm run dev
   ```

## 📝 Usage

- **Search Functionality:**  
  Use the search bar on the frontend to select a collection and enter search terms. The backend processes these queries and returns relevant results.

- **Get-All Feature:**  
  If no search term is provided, the application will retrieve all documents from the selected collection.

- **CRUD Operations:**  
  The application supports full CRUD operations across all collections, managed through the corresponding controllers.

- **Visual Experience:**  
  Enjoy the immersive shader background while browsing and interacting with the cheese database.

## 🧪 Testing

- **Component Testing:**  
  Utilize React Testing Library for unit and integration tests of React components.

- **API Testing:**  
  Use tools like Jest and Supertest for backend API endpoint testing.

- **End-to-End Testing:**  
  Implement Cypress for comprehensive end-to-end testing of the entire application flow.

## 🔄 Future Enhancements

- **Advanced Filtering:**  
  Implement additional filtering options to refine search results based on multiple criteria.

- **Pagination:**  
  Introduce pagination controls in the frontend to handle large datasets efficiently.

- **User Authentication:**  
  Add user authentication and authorization to secure access to specific features and data within the application.

- **Internationalization:**  
  Implement multi-language support to make the application accessible to a global audience.

- **Performance Optimization:**  
  Implement caching mechanisms and optimize database queries for faster response times.

## 📚 Conclusion

The **CheeseWizz** project is a robust and flexible application showcasing advanced search capabilities, modular architecture, and seamless frontend-backend integration. The extensive use of MongoDB's querying capabilities, along with dynamic search logic, ensures that users can easily access and manage data across multiple collections. With its visually appealing UI and responsive design, CheeseWizz provides an engaging and efficient platform for cheese enthusiasts and professionals alike.

## 🤝 Contributing

We welcome contributions to the CheeseWizz project! Please read our CONTRIBUTING.md file for guidelines on how to submit pull requests, report issues, and suggest improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.