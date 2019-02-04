function initMap() {
    var map;
    var locationLatitudes = document.getElementsByClassName('location-lat');
    var locationLongitudes = document.getElementsByClassName('location-lng');
    var locationStreetLatitudes = document.getElementsByClassName('location-street-lat');
    var locationStreetLongitudes = document.getElementsByClassName('location-street-lng');
    var locationStreetHeadings = document.getElementsByClassName('location-street-heading');
    var locationStreetPitches = document.getElementsByClassName('location-street-pitch');
console.log("number of locations: " + locationLatitudes.length);

    var lat = Number(locationLatitudes[0].value);
    var lng = Number(locationLongitudes[0].value);
    var position = { lat: lat, lng: lng };
    // initialise map with first location
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 14,
        mapTypeControlOptions: {
            mapTypeIds: [],
          }
    });
    
    createMarker(position, map);
    console.log("stret len: " + locationStreetLatitudes.length);
    if(locationStreetLatitudes != null){

        var streetLat = Number(locationStreetLatitudes[0].value);
        var streetLng = Number(locationStreetLongitudes[0].value);
        var streetHeading = Number(locationStreetHeadings[0].value);
        var streetPitch = Number(locationStreetPitches[0].value);

        console.log("slat: " + streetLat);
        console.log("slng: " + streetLng);
        console.log("shead: " + streetHeading);
        console.log("spitch: " + streetPitch);

         var panorama = new google.maps.StreetViewPanorama(document.getElementById('pan'), {
            position: {
                lat: streetLat,
                lng:streetLng
            },
            pov: {
                // direction facing, in degrees from north
                heading: streetHeading,
                // vertical angle, 0 - straight forward
                pitch: streetPitch
            },
            zoom: 1
        });  
    }
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

function createMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map,

  
    })
   
}