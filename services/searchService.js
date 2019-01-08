const axios = require("axios");

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
    return axios.post('http://52.56.188.219/catalogue/v1/search/index/advertise', searchParameters);
}