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

// Selectors for key players
const homeLGName = document.querySelector("#home-lg-name");
const homeLGPOS = document.querySelector("#home-lg-pos");
const homeLGStat = document.querySelector("#home-lg-stat");
const homeLAName = document.querySelector("#home-la-name");
const homeLAPOS = document.querySelector("#home-la-pos");
const homeLAStat = document.querySelector("#home-la-stat");
const homeGKName = document.querySelector("#home-gk-name");
const homeGKPOS = document.querySelector("#home-gk-pos");
const homeGKStat = document.querySelector("#home-gk-stat");
const awayLGName = document.querySelector("#away-lg-name");
const awayLGPOS = document.querySelector("#away-lg-pos");
const awayLGStat = document.querySelector("#away-lg-stat");
const awayLAName = document.querySelector("#away-la-name");
const awayLAPOS = document.querySelector("#away-la-pos");
const awayLAStat = document.querySelector("#away-la-stat");
const awayGKName = document.querySelector("#away-gk-name");
const awayGKPOS = document.querySelector("#away-gk-pos");
const awayGKStat = document.querySelector("#away-gk-stat");

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

const displayKeyPlayers = function(teamID, homeOrAway, season) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b05f88e7amsh439ba845456b31bp1767c4jsn41bc2d52d800',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${teamID}&season=${season}`, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            const playerList = data.response;

            let maxGoals = 0;
            let maxAssists = 0;

            let leadGoal = {
                playerName: "",
                position: "",
                goals: ""
            }

            let leadAssists = {
                playerName: "",
                position: "",
                assists: ""
            }

            let goalkeeper = {
                playerName: "",
                position: "Goalkeeper",
                saves: ""
            }

            for(let i = 0; i < playerList.length; i++) {
                const playerInfo = playerList[i].player;
                const playerStats = playerList[i].statistics[0];

                if (playerStats.games.position == "Goalkeeper") {
                    goalkeeper.playerName = `${playerInfo.firstname} ${playerInfo.lastname}`;
                    goalkeeper.saves = playerStats.goals.saves;
                }
                if (playerStats.goals.total > maxGoals) {
                    leadGoal.playerName = `${playerInfo.firstname} ${playerInfo.lastname}`;
                    leadGoal.position = playerStats.games.position;
                    leadGoal.goals = playerStats.goals.total;
                }
                if (playerStats.goals.assists > maxAssists) {
                    leadAssists.playerName = `${playerInfo.firstname} ${playerInfo.lastname}`;
                    leadAssists.position = playerStats.games.position;
                    leadAssists.assists = playerStats.goals.assists;
                }
            }

            // Following if statements update key player stats and handles possible null values
            if (leadGoal.playerName === null) {
                document.querySelector(`#${homeOrAway}-lg-name`).textContent = "N/A";
            } else {
                document.querySelector(`#${homeOrAway}-lg-name`).textContent = leadGoal.playerName;
                document.querySelector(`#${homeOrAway}-lg-pos`).textContent = leadGoal.position;
            }

            if (leadGoal.goals === null) {
                document.querySelector(`#${homeOrAway}-lg-stat`).textContent = 0;
            } else {
                document.querySelector(`#${homeOrAway}-lg-stat`).textContent = leadGoal.goals;
            }

            if (leadAssists.playerName === null) {
                document.querySelector(`#${homeOrAway}-la-name`).textContent = "N/A";
            } else {
                document.querySelector(`#${homeOrAway}-la-name`).textContent = leadAssists.playerName;
                document.querySelector(`#${homeOrAway}-la-pos`).textContent = leadAssists.position;
            }

            if (leadAssists.assists === null) {
                document.querySelector(`#${homeOrAway}-la-stat`).textContent = 0;
            } else {
                document.querySelector(`#${homeOrAway}-la-stat`).textContent = leadAssists.assists;
            }

            if (goalkeeper.playerName === null) {
                document.querySelector(`#${homeOrAway}-gk-name`).textContent = "N/A";
            } else {
                document.querySelector(`#${homeOrAway}-gk-name`).textContent = goalkeeper.playerName;
                document.querySelector(`#${homeOrAway}-gk-pos`).textContent = goalkeeper.position;
            }

            if (goalkeeper.saves === null) {
                document.querySelector(`#${homeOrAway}-gk-stat`).textContent = 0;
            } else {
                document.querySelector(`#${homeOrAway}-gk-stat`).textContent = goalkeeper.saves;
            }
        })
        .catch(err => console.error(err));   
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

            // gather team IDs for displayKeyPlayers function
            const homeID = teamData.home.id;
            const awayID = teamData.away.id;
            const season = data.response[0].league.season;

            displayKeyPlayers(homeID, "home", season);
            displayKeyPlayers(awayID, "away", season);
        })
        .catch(err => console.error(err));
}

getUpcomingMatch();
