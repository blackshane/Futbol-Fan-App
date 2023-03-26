 var APIkey = 'AIzaSyBx77a-IKT_sCS4_N3y5o3-GRxpMZyIIME';
 var googleMapUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBx77a-IKT_sCS4_N3y5o3-GRxpMZyIIME&callback=initMap";
 


function initMap(latitude, longitude) {
   
    var stadiumLocation = { lat: latitude, lng: longitude };
  
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: stadiumLocation,
    });

   new google.maps.Marker({
      position: stadiumLocation,
      map: map,
    });
  }
  
 

  function Stadium(name, latitude, longitude) {
    return Object({name: name, latitude: latitude, longitude: longitude})
  }

  const stadiums = Array(
    Stadium('City Park STL', 38.6312, -90.2105),
    Stadium('Mercedes-Benz Stadium ATL', 33.755489, -84.401993),
    Stadium('Soldier Field CHI', 41.862366, -87.617256),
    Stadium('Lower.com Field COL', 39.9685, -83.0171),
    Stadium('Shell Energy Stadium HUS', 29.7522, -95.3523),
    Stadium('Saputo Stadium MON', 45.562295, -73.553032),
    Stadium('Red Bull Arena NYC', 40.736844, -74.150236),
    Stadium('Subaru Park PIL', 39.83281, -75.37848),
    Stadium('PayPal Park SJ', 37.335480, 121.893028),
    Stadium('BMO Park LA', 34.012605, -118.284559),
    Stadium('BMO Field TOR', 43.633223, -79.418562),
    Stadium('Q2 Stadium AUS', 30.387718 , -97.719353 ),
    Stadium('TQL Stadium CIN', 39.111382, -84.522202),
    Stadium('Audi Field DC', 38.868851, -77.012894 ),
    Stadium("Children's Mercy Park KC", 39.12217, -94.8238),
    Stadium('DRV PNK Stadium MIA', 26.193287, -80.160629 ),
    Stadium('GEODIS Park NASH', 36.130257 , -86.765907),
    Stadium('Yankee Stadium NYC', 40.829659, -73.926186),
    Stadium('Providence Park POR', 45.5214896604, -122.691963152 ),
    Stadium('Lumen Field SEA', 47.595211 , -122.331627),
    Stadium('BC Place VAN', 49.276750, -123.111999),
    Stadium('Bank of America Stadium CLT', 35.225845, -80.853607),
    Stadium("Dick's Sporting Goods Park DEN", 39.805691 , -104.891891 ),
    Stadium('Toyota Stadium DAL', 33.154320, -96.835426),
    Stadium('Dignity Health Sports Park LA', 33.864204 , -118.261177 ),
    Stadium('Allianz Field MIN', 44.9510554, -93.1607761 ),
    Stadium('Gillette Stadium NE', 42.0878 , -71.2587),
    Stadium('Exploria Stadium ORL', 28.541085, -81.389142),
    Stadium('America First Field SLC', 40.5699467494479, -111.8927205244),
  )
  
  const stadiumListEl = document.getElementById('stadiumList')

  function loadStadiumList() {
    stadiumListEl.innerHTML = ''
    for (i in stadiums) {
      let stadium = stadiums[i]

      stadiumListEl.innerHTML += `<div data-stadium-index="${i}">${stadium.name}</div>`
    }
  }

  stadiumListEl.onclick = function(e) {
    let stadiumIndex = e.target.getAttribute('data-stadium-index')
    if (!stadiumIndex) {
      return
    }
    
  
    let stadium = stadiums[stadiumIndex]
    initMap(stadium.latitude, stadium.longitude)
    
  }



  loadStadiumList()
