const API_KEY = '3b05f88e7amsh439ba845456b31bp1767c4jsn41bc2d52d800';
const BASE_URL = 'https://api-football-beta.p.rapidapi.com/v3';

// function to fetch data from the API
async function fetchData(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'api-football-beta.p.rapidapi.com'
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.response;
}

// function to display data in the table
function displayData(data, tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  data.forEach((row, index) => {
    const tr = document.createElement('tr');
    const rank = document.createElement('td');
    rank.innerText = index + 1;
    const name = document.createElement('td');
    name.innerText = row.player.name;
    const team = document.createElement('td');
    team.innerText = row.statistics[0].team.name;
    const value = document.createElement('td');
    value.innerText = row.statistics[0].value;
    tr.append(rank, name, team, value);
    tbody.appendChild(tr);
  });
}

// function to get and display goals leaders
async function getGoalsLeaders() {
  try {
    const data = await fetchData('/statistics/players?league=253&season=2023&sort=goals');
    displayData(data, 'goals');
  } catch (error) {
    console.error(error);
  }
}

// function to get and display assists leaders
async function getAssistsLeaders() {
  try {
    const data = await fetchData('/statistics/players?league=253&season=2023&sort=assists');
    displayData(data, 'assists');
  } catch (error) {
    console.error(error);
  }
}

// function to get and display shutouts leaders
async function getShutoutsLeaders() {
  try {
    const data = await fetchData('/statistics/players?league=253&season=2023&sort=shutouts');
    displayData(data, 'shutouts');
  } catch (error) {
    console.error(error);
  }
}

// call functions to get and display leaders
getGoalsLeaders();
getAssistsLeaders();
getShutoutsLeaders();
