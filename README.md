# 🧀 CheeseWizz Server

Welcome to the **CheeseWizz** project! This project is a cheese-themed API that serves all your cheesy needs, from origins and types to math operations involving cheese! 🍕🧀

## 📋 Project Overview

CheeseWizz includes a variety of cheese-related modules and an Express server to handle operations via API endpoints. This project is built with modularity and fun in mind, ensuring a delightful experience while working with cheese data.

## 🔧 Getting Started

Follow these steps to get the project up and running on your local machine:

### 1. **Clone the Repository:**
   - Open terminal.
   - Clone the repository to your local machine.
   - Navigate into the project directory.

### 2. **Install Dependencies:**
   - In the project directory, run `npm install` to install the necessary dependencies.

### 3. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add your environment variables (e.g., `PORT`, `MONGO_URI`).

### 4. **Run the Server:**
   - To start the server, run `npm start` from the project directory.
   - The server will be running on `http://localhost:3000`.

### 5. **Test the API Endpoints:**
   - Use a browser or Postman to test the API endpoints:
     - `http://localhost:3000/api/v1/cheeses`
     - `http://localhost:3000/api/v1/cheeses/:id`
     - `http://localhost:3000/api/v1/cheeses` (POST)
     - `http://localhost:3000/api/v1/cheeses/:id` (PUT)
     - `http://localhost:3000/api/v1/cheeses/:id` (DELETE)

## 📂 Project Structure

```
CheeseWizz/
│
├── README.md
├── Client/
├── Server/
│   ├── app/
│   │   ├── controller/
│   │   │   ├── bigCtrl.js
│   │   │   ├── originCtrl.js
│   │   │   ├── relatedCtrl.js
│   │   │   └── tasteCtrl.js
│   │   ├── db/
│   │   │   ├── config.js
│   │   │   └── tests/
│   │   │       ├── index.js
│   │   │       ├── jest test strings/
│   │   │       │   └── cheeseMath.test.js
│   │   │       └── math modules/
│   │   │           ├── addCheese.js
│   │   │           ├── cheeseMath.js
│   │   │           ├── cheeseSqrt.js
│   │   │           ├── divideCheese.js
│   │   │           ├── maxCheese.js
│   │   │           ├── multiplyCheese.js
│   │   │           └── subtractCheese.js
│   │   ├── index.js
│   │   ├── models/
│   │   │   ├── cheeseModel.js
│   │   │   ├── relatedCheeseSchema.js
│   │   │   ├── originSchema.js
│   │   │   └── tasteSchema.js
│   │   ├── routes/
│   │   │   ├── cheeseRoutes.js
│   │   │   └── index.js
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── playground-1.mongodb.js
└── postmanCollections/
```

## 🧀 API Endpoints

### 1. **GET /api/v1/cheeses**
   - Retrieves all cheese types.

### 2. **GET /api/v1/cheeses/:id**
   - Retrieves a specific cheese by its ID.

### 3. **POST /api/v1/cheeses**
   - Creates a new cheese entry.

### 4. **PUT /api/v1/cheeses/:id**
   - Updates an existing cheese entry by ID.

### 5. **DELETE /api/v1/cheeses/:id**
   - Deletes a cheese entry by ID.

### 6. **GET /api/v1/origins**
   - Retrieves all cheese origins.

### 7. **GET /api/v1/origins/:id**
   - Retrieves a specific origin by its ID.

### 8. **GET /api/v1/tastes**
   - Retrieves all cheese tastes.

### 9. **GET /api/v1/tastes/:id**
   - Retrieves a specific taste by its ID.

### 10. **GET /api/v1/relatedCheeses**
   - Retrieves all related cheeses.

### 11. **GET /api/v1/relatedCheeses/:id**
   - Retrieves a specific related cheese by its ID.

## 🧪 Testing

- All math-related cheese functions and API endpoints are thoroughly tested using Jest.
- Tests are located in `app/db/tests/` and cover various scenarios to ensure all operations are working as expected.

## 🚀 Running the Project

To run the server and see the CheeseWizz API in action:

1. **Run the Server:**
   ```bash
   npm start
   ```
2. **Run the Tests:**
   ```bash
   npm test
   ```

Experience the cheesy goodness through your terminal and API endpoints!

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Indulge in the world of cheese with CheeseWizz! If you encounter any issues, feel free to open an issue or submit a pull request. 🧀✨