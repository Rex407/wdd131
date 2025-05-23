// Footer: Current Year and Last Modified Date
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Wind Chill Calculation
function calculateWindChill(temp, windSpeed) {
    return Math.round(13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16));
}

// Static Weather Data (in Celsius and km/h)
const temperature = 5; // °C
const windSpeed = 15; // km/h

// Wind Chill Conditions (Metric)
const tempThreshold = 10; // °C
const windSpeedThreshold = 4.8; // km/h

// Display Wind Chill
document.addEventListener('DOMContentLoaded', () => {
    if (temperature <= tempThreshold && windSpeed > windSpeedThreshold) {
        const windChill = calculateWindChill(temperature, windSpeed);
        document.getElementById('wind-chill').textContent = `${windChill}°C`;
    } else {
        document.getElementById('wind-chill').textContent = 'N/A';
    }
});