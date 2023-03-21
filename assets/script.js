const tempDisplay = document.querySelector("#temperature-display");
const precipDisplay = document.querySelector("#precip-display");
const windspeedDisplay = document.querySelector("#windspeed-display");

let matchLocation = {
    latitude: "",
    longitude: ""
};

// matchDate must be string in format yyyy-mm-dd
const weatherRequest = function(matchDate) {
    // Requests from Open-Meteo API. Gives it a latitude and longitude and it returns max temp, precipitation hours, precipitation probability, windspeed, and wind direction
    // The info is given in imperial units
    const openMeteoRequest = new Request(`https://api.open-meteo.com/v1/forecast?latitude=${matchLocation.latitude}&longitude=${matchLocation.longitude}&forecast_days=1&start_date=${matchDate}&end_date=${matchDate}&daily=temperature_2m_max,precipitation_hours,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`)
    
    fetch(openMeteoRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            tempDisplay.textContent = `${data.daily.temperature_2m_max[0]}°F`;
            precipDisplay.textContent = `${data.daily.precipitation_probability_max[0]}%`;
            windspeedDisplay.textContent = `${data.daily.windspeed_10m_max[0]} mph`
        });
}

// matchDate must be string in format yyyy-mm-dd
const setWeatherDisplay = function(cityName, matchDate) {
    // Requests from openweathermap. Returns latitude and longitude
    const geoCodeRequest = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=d9ae7cf85080aa6d6b35191acb4ad9b0`;

    fetch(geoCodeRequest)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            matchLocation.latitude = data[0].lat;
            matchLocation.longitude = data[0].lon;
        })
        .then(function () {
            weatherRequest(matchDate);
        });
}


