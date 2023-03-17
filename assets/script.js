let matchLocation = {
    latitude: "",
    longitude: ""
};

// TODO: Function make fetch request and update HTML
const getWeather = function() {
    // Requests from Open-Meteo API. Gives it a latitude and longitude and it returns max temp, precipitation hours, precipitation probability, windspeed, and wind direction
    // The info is given in imperial units
    const openMeteoRequest = new Request(`https://api.open-meteo.com/v1/forecast?latitude=${matchLocation.latitude}&longitude=${matchLocation.longitude}&daily=temperature_2m_max,precipitation_hours,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`)
}