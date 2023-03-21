 var APIkey = 'AIzaSyBx77a-IKT_sCS4_N3y5o3-GRxpMZyIIME';
 var googleMapUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBx77a-IKT_sCS4_N3y5o3-GRxpMZyIIME&callback=initMap";

// Initialize and add the map
function initMap() {
    // The location of CityPark (the stadium)
    const cityParkLoc = { lat: 38.6312, lng: -90.2105 };
    // The map, centered at CityPark
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: cityParkLoc,
    });
    // The marker, positioned at CityPark
   new google.maps.Marker({
      position: cityParkLoc,
      map: map,
    });
  }
  
  window.initMap = initMap;

