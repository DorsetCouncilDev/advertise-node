
    const axios = require("axios");
    
const testWebService = "http://52.56.188.219/catalogue/v1/indexes/advertise";
const liveWebService = "https://web.dorsetcc.gov.uk/catalogue/v1/indexes/advertise";
var advertiseWebService = liveWebService;
/*
axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })
  
  axios.interceptors.response.use(response => {
    console.log('Response:', response)
    return response
  })
*/
    exports.getDocumentTypes = function() {
        return axios.get(advertiseWebService);
    }

    exports.setPrices = function(documents) {
        documents.forEach((document) => {
            document.document.price = getPrice(document.document.properties);
        })
        return documents;
    }

    getPrice = function(properties) {
        for (var i = 0; i < properties.length; i++) {
            if (properties[i].propertyName == 'Price') {
                return properties[i].publishedValue;
            }
        }
    }

    exports.getLocation = function(postcode) {
        return axios.get('https://apptest.dorsetcc.gov.uk/gazetteer/rest/address/postcode/' + postcode);
    }

    exports.setAvailable = function (documents) {
        for (var i = 0; i < documents.length; i++) {
            documents[i].document.available = isAvailable(documents[i].document.properties);
        }
        return documents;
    }

    isAvailable = function (properties) {
        for (var i = 0; i < properties.length; i++) {
            if (properties[i].propertyName == 'Available') {
                return properties[i].publishedValue;
            }
        }
    }

    exports.getDocument = function(documentReference){
        return axios.get(advertiseWebService + '/documents/' + documentReference);
      };

    exports.getAvailability = function(properties){
        console.log("p-length: " + properties.length);
        for (var i = 0; i < properties.length; i++) {
            if (properties[i].propertyName == 'Availability') {
                return properties[i].publishedValue;
            }
        }
      }