const teamName = document.querySelector("#team-name");
const teamLogo = document.querySelector("#team-logo");
const wins = document.querySelector("#wins");
const losses = document.querySelector("#losses");
const draws = document.querySelector("#draws");
const goalsFor = document.querySelector("#goals-for");
const goalsAgainst = document.querySelector("#goals-against");
const playerStatsBody = document.querySelector("#player-stats-body");

// Options for fetch
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3b05f88e7amsh439ba845456b31bp1767c4jsn41bc2d52d800',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

// Code to run on page load
const initializePage = function() {
    // Pulls 
    let selectedTeamID = localStorage.getItem("teamID");

    // Team info fetch
    fetch(`https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=253&season=2023&team=${selectedTeamID}`, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // debug
            console.log(data);

            const response = data.response;
            const teamStats = response.biggest;

            // Sets team name and logo
            teamName.textContent = response.team.name;
            teamLogo.setAttribute("src", response.team.logo);

            // Sets team stats
            wins.textContent = teamStats.streak.wins;
            losses.textContent = teamStats.streak.loses;
            draws.innerHTML = teamStats.streak.draws;
            goalsFor.innerHTML = teamStats.goals.for.away + teamStats.goals.for.home;
            goalsAgainst.innerHTML = teamStats.goals.against.away + teamStats.goals.against.home;
        })
        .catch(err => console.error(err));

    // Player info fetch
    fetch(`https://api-football-v1.p.rapidapi.com/v3/players?season=2023&team=${selectedTeamID}`, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // debug
            console.log(data);

            const playerArray = data.response;

            for (const item of playerArray) {
                const player = item.player;
                const statistics = item.statistics[0];

                // Creates new elements for table
                const newRow = document.createElement("tr");
                const nameTD = document.createElement("td");
                const positionTD = document.createElement("td");
                const goalsTD = document.createElement("td");
                const assistsTD = document.createElement("td");
                const savesTD = document.createElement("td");

                // Sets name and position for player
                nameTD.innerHTML = `${player.firstname} ${player.lastname}`;
                positionTD.innerHTML = statistics.games.position;

                // If statements check for null values: if null, sets innerHTML to 0
                if (statistics.goals.total) {
                    goalsTD.innerHTML = statistics.goals.total;
                } else {
                    goalsTD.innerHTML = 0;
                }

                if (statistics.goals.assists) {
                    assistsTD.innerHTML = statistics.goals.assists;
                } else {
                    assistsTD.innerHTML = 0;
                }

                if (statistics.goals.saves) {
                    savesTD.innerHTML = statistics.goals.saves;
                } else {
                    savesTD.innerHTML = 0;
                }

                // Adds table data elements to new row, adds table row to player stats table body
                newRow.appendChild(nameTD);
                newRow.appendChild(positionTD);
                newRow.appendChild(goalsTD);
                newRow.appendChild(assistsTD);
                newRow.appendChild(savesTD);
                playerStatsBody.appendChild(newRow);
            }

        })
        .catch(err => console.error(err)); 
}

initializePage();