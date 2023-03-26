const apiKey = '5d7ca011cdmsh08102a021cbd2a6p1ea7c2jsneef3d53fdd34';
const leagueId = 253; // Major League Soccer ID
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

// Get top goals
fetch('https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=253&season=2023', options)
  .then(response => response.json())
  .then(data => {
    console.log('Top Goals:', data);
    // Display the league leaders in goals
    const topGoals = [...data.response].splice(0, 5);
    const topGoalsDiv = document.getElementById('top-goals');
    topGoalsDiv.innerHTML = '<h2>League Leaders in Goals:</h2>';
    topGoals.forEach((player, index) => {
      topGoalsDiv.innerHTML += `<p>${index + 1}. ${player.player.firstname} ${player.player.lastname} (${player.statistics[0].team.name}): ${player.statistics[0].goals.total}</p>`;
    });
  })
  .catch(error => console.log('Error:', error));

// Get top assists
fetch('https://api-football-v1.p.rapidapi.com/v3/players/topassists?league=253&season=2023', options)
  .then(response => response.json())
  .then(data => {
    console.log('Top Assists:', data);
    // Display the league leaders in assists
    const topAssists = [...data.response].splice(0, 5);
    const topAssistsDiv = document.getElementById('top-assists');
    topAssistsDiv.innerHTML = '<h2>League Leaders in Assists:</h2>';
    topAssists.forEach((player, index) => {
      topAssistsDiv.innerHTML += `<p>${index + 1}. ${player.player.firstname} ${player.player.lastname} (${player.statistics[0].team.name}): ${player.statistics[0].goals.assists}</p>`;
    });
  })
  .catch(error => console.log('Error:', error));
