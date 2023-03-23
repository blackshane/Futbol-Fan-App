const tempDisplay = document.querySelector("#temperature-display");
const precipDisplay = document.querySelector("#precip-display");
const windspeedDisplay = document.querySelector("#windspeed-display");
const homeLogo = document.querySelector("#home-team-logo");
const homeName = document.querySelector("#home-team-name");
const awayLogo = document.querySelector("#away-team-logo");
const awayName = document.querySelector("#away-team-name");
const stadiumPic = document.querySelector("#stadium-pic");
const stadiumName = document.querySelector("#stadium-name");
const stadiumLocation = document.querySelector("#stadium-location");

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

const getStadiumInfo = function(venueName) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b05f88e7amsh439ba845456b31bp1767c4jsn41bc2d52d800',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    // Sets stadium name, stadium picture, and location
    fetch(`https://api-football-v1.p.rapidapi.com/v3/venues?name=${venueName}`, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const stadiumData = data.response[0];

            stadiumPic.setAttribute("src", stadiumData.image);
            stadiumName.textContent = venueName;
            stadiumLocation.textContent = `${stadiumData.address}, ${stadiumData.city}`;
        })
        .catch(err => console.error(err));
}

const getUpcomingMatch = function() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b05f88e7amsh439ba845456b31bp1767c4jsn41bc2d52d800',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    // Sets name and logo for home and away teams
    fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=253&next=1`, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // debug
            console.log(data);

            const teamData = data.response[0].teams;

            homeLogo.setAttribute("src", teamData.home.logo);
            homeName.textContent = teamData.home.name;
            awayLogo.setAttribute("src", teamData.away.logo);
            awayName.textContent = teamData.away.name;

            const venueName = data.response[0].fixture.venue.name;

            // sets stadium pic and name using venue name
            getStadiumInfo(venueName);

            const cityData = data.response[0].fixture.venue.city

            const splitCityName = cityData.split(",")

            const cityName = splitCityName[0];
            const matchDate = data.response[0].fixture.date.slice(0, 10);

            setWeatherDisplay(cityName, matchDate);
        })
        .catch(err => console.error(err));
}

getUpcomingMatch();
