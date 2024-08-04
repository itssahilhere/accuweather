document.getElementById('location-form').addEventListener('submit', getWeather);

async function getWeather(e) {
    e.preventDefault(); // Prevent the form from submitting

    const locationInput = document.getElementById('location-input');
    const weatherData = document.getElementById('weather-data');
    const apiKey = 'e90aee188960c047ac0e881786715ab7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (response.status === 404) {
            weatherData.innerHTML = `<strong style="font-size: 1.5em;">${locationInput.value}</strong><br>Error: City not found`;
            return;
        }
        if (!response.ok) {
            weatherData.innerHTML = `<strong style="font-size: 1.5em;">${locationInput.value}</strong><br>Error: Failed to fetch weather data`;
            return;
        }
        const data = await response.json();
        weatherData.innerHTML = `<strong style="font-size: 1.5em;">${locationInput.value}</strong><br>Temperature: ${data.main.temp}°C<br>Humidity: ${data.main.humidity}%<br>Weather: ${data.weather[0].description}`;
    } catch (e) {
        weatherData.innerHTML = `<strong style="font-size: 1.5em;">${locationInput.value}</strong><br>Error: Failed to fetch weather data`;
    }
    locationInput.value = '';
}
