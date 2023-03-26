const api_key = '3b05f88e7amsh439ba845456b31bp1767c4jsn41bc2d52d800';
const api_url = `https://api-football-v1.p.rapidapi.com/v3/standings?league=253&season=2023`;

fetch(api_url, {
  method: 'GET',
  headers: {
    'x-rapidapi-key': api_key,
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  }
})
  .then(response => response.json())
  .then(data => {
    // Parse the response data and separate it into two arrays for the Eastern and Western Conferences
    const easternStandings = data.response[0].league.standings[0].map(team => ({
      position: team.rank,
      name: team.team.name,
      points: team.points,
      // ID for links to team pages
      id: team.team.id,
    }));
    
    const westernStandings = data.response[0].league.standings[1].map(team => ({
      position: team.rank,
      name: team.team.name,
      points: team.points,
      // ID for links to team pages
      id: team.team.id,
    }));
    
    // Populate the Eastern Conference standings table
    const easternTable = document.getElementById("eastern-standings");
    easternStandings.forEach(team => {
      const row = easternTable.insertRow();
      const position = row.insertCell(0);
      const name = row.insertCell(1);
      const points = row.insertCell(2);
      position.innerHTML = team.position;
      name.innerHTML = team.name;
      points.innerHTML = team.points;
      // adds data value equal to the team's ID
      name.setAttribute("data-id", team.id);
      // Adds class to change cursor
      name.classList.add("pointer-cursor");

      // Clicking on team names takes user to the team page
      name.addEventListener("click", function() {
        // Saves team id number to local storage for team-info.js to access
        localStorage.setItem("teamID", name.getAttribute("data-id"));
        // Changes file location to boilerplate team-info page
        // Using team-info.js, it is populated with the team's stats and player roster
        location.assign("../TEAMS/team-info.html");
      });
    });
    
    // Populate the Western Conference standings table
    const westernTable = document.getElementById("western-standings");
    westernStandings.forEach(team => {
      const row = westernTable.insertRow();
      const position = row.insertCell(0);
      const name = row.insertCell(1);
      const points = row.insertCell(2);
      position.innerHTML = team.position;
      name.innerHTML = team.name;
      points.innerHTML = team.points;
      // adds data value equal to the team's ID
      name.setAttribute("data-id", team.id);
      // Adds class to change cursor
      name.classList.add("pointer-cursor");

      // Clicking on team names takes user to the team page
      name.addEventListener("click", function() {
        // Saves team id number to local storage for team-info.js to access
        localStorage.setItem("teamID", name.getAttribute("data-id"));
        // Changes file location to boilerplate team-info page
        // Using team-info.js, it is populated with the team's stats and player roster
        location.assign("../TEAMS/team-info.html");
      });
    });
  })
  .catch(error => {
    console.error(error);
  });
