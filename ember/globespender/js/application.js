window.Expenses = Ember.Application.create({
	markersDisplayed: [],
	propertyChanges: false,
	
	getPropertyLock: function() {
		if (this.propertyChanges) {
			return false;
		} else {
			this.propertyChanges = true;
			return true;
		}
	},
	
	releasePropertyLock: function() {
		this.propertyChanges = false;
	}
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

Expenses.MyTextField = Em.TextField.extend({
  attributeBindings: ['size'],
  size: 7
});

Expenses.DateTextField = Em.TextField.extend({
  attributeBindings: ['size'],
  size: 15
});