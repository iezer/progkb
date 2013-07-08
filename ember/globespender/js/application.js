window.Expenses = Ember.Application.create({
	markersDisplayed: []
});

Expenses.initMap = function () {
  var myOptions = {
    center: new google.maps.LatLng(40.7143528, -74.0059731), // New York
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  Expenses.map = new google.maps.Map($("#map_canvas")[0],
      myOptions);
  google.maps.event.addListener(Expenses.map, 'click', function(event){
	  Expenses.mapController.handleClick(event);
  });

	geocoder = new google.maps.Geocoder();
	//this.codeAddress("New York");
};

Expenses.ready = function () {
  Expenses.initMap();
};

Expenses.codeAddress = function (place, infoBox) {
  geocoder.geocode( {'address': place.place}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      var infoWindow = new google.maps.InfoWindow({
			    content: infoBox
			});

      Expenses.map.setCenter(results[0].geometry.location);
			var circleOptions = {
	      strokeColor: '#FF0000',
	      strokeOpacity: 0.8,
	      strokeWeight: 2,
	      fillColor: '#FF0000',
	      fillOpacity: 0.35,
	      map: Expenses.map,
				clickable:true,
	      center: results[0].geometry.location,
	      radius: 20000 * place.average
	    };
			console.log (place.place + ": " + place.average);
	    var cityCircle = new google.maps.Circle(circleOptions);
			Expenses.markersDisplayed.push(cityCircle);
			
			google.maps.event.addListener(cityCircle, 'click', function () {
				infoWindow.setPosition(results[0].geometry.location);
				infoWindow.open(Expenses.map);
			});
			
			google.maps.event.addListener(Expenses.map,'click', function () {
				infoWindow.close();
			});
			
			console.log (place.place + ": " + results[0].geometry.location.lat() + ", " + results[0].geometry.location.lng());
    } else {
      alert('Geocode was not successful on "' + place.place +'" for the following reason: ' + status);
    }
  });
}

/*

var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  var mapOptions = {
    zoom: 4,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
}  */
