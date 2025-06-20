FindMeService UI
================

FindMeService is a React-based web application designed to connect users seeking help with skilled individuals. The app features user authentication, profile management, skill-based search, and work inquiry/request management. It uses Google APIs for address autofill and geolocation features.
Note: this project had a backend API built with Spring Boot Java, which is not included in this repository. The backend API is available at FindMeService API repository: [FindMeService API]`

## Features
- User registration and login
- Profile creation and management
- Search for skilled individuals by location and skill
- Send and receive work inquiries and requests
- Google address autocomplete and geolocation
- Responsive UI with Bootstrap and Ant Design

## Prerequisites
- Node.js v16 or above
- npm (Node Package Manager)
- Backend API (Spring Boot Java API) running at `localhost:8098` (or update the endpoint in the project)

## Getting Started
1. Clone or download this repository.
2. Open a terminal and navigate to the project folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
   The app will start on `localhost:8080` or `localhost:8084`. If these ports are in use, a new port will be chosen and displayed in the terminal.

## Usage Notes
- **Google APIs:** For address autofill and geolocation, use `localhost` in the browser URL. Accessing via IP address will not work due to API restrictions.
- **Backend API:** Ensure the Spring Boot backend is running at `localhost:8098`. Update the endpoint in the project if needed.

## Google Maps API Key
To enable address autocomplete and geolocation features, you must create a Google Maps API key:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Enable the following APIs:
   - Places API
   - Maps JavaScript API
4. Go to **APIs & Services > Credentials** and create an API key.
5. Restrict the key to `localhost` for security.
6. Add your API key to the project by replacing the value of the variable `YOUR_GOOGLE_MAPS_API_KEY` in `src/compnents/Search/GoogleAddressAutoComplete.js`:
   ```js
   let YOUR_GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';
   ```

## Author
Harish Janardhanan

## License
ISC
