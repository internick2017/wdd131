// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Set last modified date in footer
document.getElementById('lastModified').textContent = document.lastModified;

// Get temperature and wind speed values
const temperatureElement = document.querySelector('.weather-data p:nth-child(2)');
const windSpeedElement = document.querySelector('.weather-data p:nth-child(6)');
const windChillElement = document.getElementById('windchill');

// Extract numeric values from the elements
const temperatureText = temperatureElement.textContent;
const windSpeedText = windSpeedElement.textContent;

// Parse the temperature and wind speed values
const temperature = parseFloat(temperatureText);
const windSpeed = parseFloat(windSpeedText);

// Function to calculate wind chill
function calculateWindChill(temp, speed) { return 35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp * Math.pow(speed, 0.16)); }

// Check if conditions meet the requirements for wind chill calculation
if (temperature <= 50 && windSpeed > 3) {
    // Calculate wind chill and round to 1 decimal place
    const windChill = calculateWindChill(temperature, windSpeed);
    const roundedWindChill = Math.round(windChill * 10) / 10;

    // Display the wind chill value
    windChillElement.textContent = `${roundedWindChill} °F`;
} else {
    // If conditions don't meet requirements, display N/A
    windChillElement.textContent = "N/A";
}