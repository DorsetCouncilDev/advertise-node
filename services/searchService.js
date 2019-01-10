const axios = require("axios");

const testSearchWebService = "http://52.56.188.219/catalogue/v1/search/index/advertise";
const liveSearchWebService = "https://web.dorsetcc.gov.uk/catalogue/v1/search/index/advertise";
var advertiseSearchWebService = liveSearchWebService;

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

exports.parseSearchParameters = function(query, references) {
    var typesParameters = [];

    references.forEach((ref) => {
        if (query[ref])
            typesParameters.push(ref);
    });
    var testSearchTypes = ["bin-lid-advertising"];
    var location = null;

    var parameters = [];
    if (query.available != null) {
        var availableParameter = {
            "reference": "available",
            "value": true
        };
        parameters.push(availableParameter);
    } else {
        parameters = [];
    }

    return {
        documentTypes: typesParameters,
        location: location,
        parameters: parameters
    };
}

exports.setInitalSearchParameters = function(references) {
    return {
        documentTypes: references,
        location: null,
        parameters: []
    };
}

exports.search = function(searchParameters) {
    return axios.post(advertiseSearchWebService , searchParameters);
}