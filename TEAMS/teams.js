
// debug
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3b05f88e7amsh439ba845456b31bp1767c4jsn41bc2d52d800',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};

// debug
fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?id=253', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));