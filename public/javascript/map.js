function initMap() {
    var map;
    var documentCards = document.getElementsByClassName("asset-card");
    var baseLat = 50.563110932545825
    var baseLong = -2.4489365380248693
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: baseLat,
            lng: baseLong
        },
        zoom: 8
    });
    createMarkers(documentCards, map);
}

function createMarkers(documentCards, map) {
    for (var i = 0; i < documentCards.length; i++) {
        var locationsLat = documentCards[i].getElementsByClassName("location-lat");
        var locationsLng = documentCards[i].getElementsByClassName("location-lng");
        var documentTypeReference = documentCards[i].getElementsByClassName("doc-type-ref")[0].value;

        if (typeof locationsLat !== 'undefined' && typeof locationsLng !== 'undefined' &&
            typeof locationsLat[0] !== 'undefined' && typeof locationsLng[0] !== 'undefined') {

            var lat = Number(locationsLat[0].value);
            var lng = Number(locationsLng[0].value);
            var position = { lat: lat, lng: lng };

            var name = documentCards[i].getElementsByClassName("card-body")[0].innerHTML;
            var infoWindow = createInfoWindow(name)

            createMarker(position, infoWindow,documentTypeReference, map);
        }
    }
}

function createInfoWindow(name) {
    return new google.maps.InfoWindow({
        content: name
    });
}

function createMarker(position, infoWindow,documentTypeReference, map) {
    var iconUrl = '/images/icons/' + documentTypeReference + '.svg'; 
    var icon = {url: iconUrl,scaledSize: new google.maps.Size(45, 45)};
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        infoWindow: infoWindow,
        icon: icon
    })
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}