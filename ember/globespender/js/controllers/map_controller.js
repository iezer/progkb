Expenses.mapController = Em.Object.create({
	markersForMapBinding: "Expenses.markers.content",
	markersDisplayed: [],
	handleClick: function (x) {
		console.log ("map clicked");
	},
	markersForMapDidChange: function () {
		var that = this;
		$.each(this.markersDisplayed, function (i, m) {m.setMap(null);});
		$.each(this.markersForMap, function  (i, ll) {
			var marker = new google.maps.Marker({
				position: ll.get('latLng')
			});
			ll.marker = marker;
			google.maps.event.addListener(marker, 'click', function() {
				ll.markerClick();
			});
			that.markersDisplayed.pushObject(marker);
			marker.setMap(Expenses.map);
			ll.markerClick();
		});
	}.observes('markersForMap.@each')
});
