const homeLogo = document.querySelector("#home-team-logo");
const homeName = document.querySelector("#home-team-name");
const awayLogo = document.querySelector("#away-team-logo");
const awayName = document.querySelector("#away-team-name");
const stadiumPic = document.querySelector("#stadium-pic");
const stadiumName = document.querySelector("#stadium-name");
const stadiumLocation = document.querySelector("#stadium-location");

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

            getStadiumInfo(venueName);
        })
        .catch(err => console.error(err));
}

getUpcomingMatch();