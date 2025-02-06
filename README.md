# 🌍 Travel Planner App

## 📌 Project Overview
This project is the **Capstone Project** for Udacity's **Frontend Web Developer Nanodegree (FEND)**.  
It integrates multiple APIs to create a **Travel Planning App**, where users can input a destination and departure date to get **weather forecasts** and **location images**.

The project covers all major topics from the nanodegree, including:

- **JavaScript ES6+** 
- **Webpack** 
- **Express.js** 
- **Service Workers** 
- **SCSS** 
- **Jest Testing** 

## ✅ Key Features
- **User Inputs:** Enter a destination and departure date.  
- **Weather Forecast:** shows current weather.
- **Destination Image:** Fetches and displays an image from **Pixabay**.
- **Offline Support:** Uses **Service Workers** to cache assets.
- **Trip Management:**
  - Saves trips using **Local Storage**.
  - Allows exporting trip details to **PDF**.
- **Form Validation:** Ensures no empty fields, no past dates, and valid locations.

## 🌍 APIs Used
The project integrates three external APIs:

### 1️⃣ [Geonames API](http://www.geonames.org/)
- Converts city names to latitude & longitude.
- Required to retrieve coordinates for **Weatherbit API**.

### 2️⃣ [Weatherbit API](https://www.weatherbit.io/)
- Provides weather forecasts based on latitude & longitude.

### 3️⃣ [Pixabay API](https://pixabay.com/api/docs/)
- Fetches images of the travel destination.

# 📂 Project Structure

```
Root
├── .env
├── .babelrc
├── package.json
├── README.md
├── webpack.dev.js
├── webpack.prod.js
├── test
│   ├── client
│   ├── server
├── src
│   ├── client
│   │   ├── index.js
│   │   ├── js
│   │   │   ├── formHandler.js
│   │   │   ├── validateInput.js
│   │   │   ├── updateUI.js
│   │   │   ├── exportTrip.js
│   │   │   ├── printTrip.js
│   │   ├── styles
│   │   │   ├── _base.scss
│   │   │   ├── _buttons.scss
│   │   │   ├── _form.scss
│   │   │   ├── _trips.scss
│   │   │   ├── _variables.scss
│   │   │   ├── style.scss
│   │   └── views
│   │       ├── index.html
│   ├── server
│   │   ├── server.js
│   │   ├── app.js
│   │   ├── geonamesAPI.js
│   │   ├── weatherbitAPI.js
│   │   ├── pixabayAPI.js

```



## 🚀 Installation & Setup

### 1️⃣ Prerequisites
Ensure you have **Node.js** and **npm** installed:
```
node -v  # Check Node.js version
npm -v   # Check npm version
```

### 2️⃣ Clone the Repository
```
git clone https://github.com/shehab-kharaz/fend-capstone.git
cd CapstoneProject
```

### 3️⃣ Install Dependencies
```
npm install
```

### 4️⃣ Set Up API Keys
Create a `.env` file inside the `/src/server/` folder.  
Add the following API keys:
```
GEONAMES_USERNAME=your_geonames_username
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key
```
### 5️⃣ Run in Development Mode
Start the development server with Webpack Dev Server:
```
npm run dev
```
- Opens the app at **http://localhost:8080/**.
- Auto-reloads changes.

### 6️⃣ Run in Production Mode
To build the project and run it in production:
```
npm run build
npm start
```
- Runs on **http://localhost:8081/**.

## 🧪 Testing
This project includes **Jest tests** for:
✔ **Server-side API handling (Express)**  
✔ **Client-side form validation**

### Run Tests
```
npm test
```

## 🔄 Offline Functionality (Service Workers)
The project registers a **Service Worker** using **Workbox**.
- Caches static assets & API responses for offline access.

## 📌 Additional Features

### 📌 Additional Features Implemented Beyond Requirements:
✅ **Export Trip to PDF**  
✅ **Save Trips to Local Storage (Persistent Data)**  


