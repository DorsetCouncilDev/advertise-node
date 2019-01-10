
    const axios = require("axios");
    
const testWebService = "http://52.56.188.219/catalogue/v1/indexes/advertise";
const liveWebService = "https://web.dorsetcc.gov.uk/catalogue/v1/indexes/";
var advertiseWebService = liveWebService;

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