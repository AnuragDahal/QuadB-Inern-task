# QuadB-Tech Interntask

This project is a clone of a cryptocurrency information dashboard that displays real-time trading data for Bitcoin (BTC) against the Indian Rupee (INR). It consists of a backend server to fetch and store data, and a frontend application to display the data to users.

## Project Structure

- `server-js.js`: Backend server implementation using Node.js, Express, and MongoDB.
- `script-js.js`: Frontend JavaScript to dynamically update the cryptocurrency data on the webpage.
- `index-html.html`: HTML structure for the frontend page.
- `style-css.css`: CSS styles for the frontend page.

## Backend (server.js)

### Overview
The backend server is responsible for fetching cryptocurrency data from the WazirX API, storing it in a MongoDB database, and providing an API endpoint for the frontend to retrieve this data.

### Key Features
- **CORS Middleware**: Configured using the `cors` package to allow cross-origin requests from any origin.
- **MongoDB Connection**: Connects to MongoDB using Mongoose.
- **Data Fetching and Storage**: Fetches data from the WazirX API, processes it, and updates or inserts records in the MongoDB database.
- **API Endpoint**: Provides a `/api/tickers` endpoint to retrieve the top 10 cryptocurrencies by volume, sorted in descending order.

### Code Explanation
- **CORS Configuration**: `app.use(cors());` allows requests from any origin.
- **MongoDB Connection**: Uses Mongoose to connect to the database.
- **Schema Definition**: Defines a `cryptoSchema` for storing cryptocurrency data.
- **Data Fetching**: Fetches data from the WazirX API, processes it, and updates the database.
- **API Route**: Serves the data to the frontend with sorting and limiting.

## Frontend

### index.html
The HTML file provides the structure for the dashboard, including:
- A header with currency selection and a countdown timer.
- A main section displaying the average trading price and a table for the top 10 cryptocurrencies.

### script.js
The JavaScript file performs the following tasks:
- Fetches data from the backend API.
- Updates the table with the latest cryptocurrency data.
- Calculates the average price and displays it.
- Implements a countdown timer that resets every 60 seconds.

### style.css
The CSS file provides styles for the webpage:
- Sets the font, background colors, and layout for the header, main content, and table.
- Includes responsive design for different screen sizes.

## How to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Start the Backend Server**

```bash
node server.js
```
3. **Open index.html in a Browser**
    + Navigate to index.html to view the dashboard.
