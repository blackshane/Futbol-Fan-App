const teamName = document.querySelector("#team-name");
const teamLogo = document.querySelector("#team-logo");
const wins = document.querySelector("#wins");
const losses = document.querySelector("#losses");
const draws = document.querySelector("#draws");
const goalsFor = document.querySelector("#goals-for");
const goalsAgainst = document.querySelector("#goals-against");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3b05f88e7amsh439ba845456b31bp1767c4jsn41bc2d52d800',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

const initializePage = function() {
    let selectedTeamID = localStorage.getItem("teamID");

    fetch(`https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=253&season=2023&team=${selectedTeamID}`, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // debug
            console.log(data);

            const response = data.response;
            const teamStats = response.biggest;

            teamName.textContent = response.team.name;
            teamLogo.setAttribute("src", response.team.logo);

            wins.textContent = teamStats.streak.wins;
            losses.textContent = teamStats.streak.loses;
            draws.innerHTML = teamStats.streak.draws;
            goalsFor.innerHTML = teamStats.goals.for.away + teamStats.goals.for.home;
            goalsAgainst.innerHTML = teamStats.goals.against.away + teamStats.goals.against.home;
        })
        .catch(err => console.error(err));
}

initializePage();