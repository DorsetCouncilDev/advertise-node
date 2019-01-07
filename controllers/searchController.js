const axios = require("axios");

/*  HTTP Logging    */

axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })


exports.search = async function(req,res){
    var documentTypes; 
    var searchPostParameters;
    var documents;
    var typeReferenceStrings;
    
    res.cookie("name" , "Adam");

    await getDocumentTypes().then((response)=>{
        var allDocumentTypes = response.data.documentTypes;
        var documentTypesToShow = [];

        allDocumentTypes.forEach((type)=>{
            if(type.display){
                type.iconURL = "images/icons/" + type.reference + ".png";
                documentTypesToShow.push(type);
            }
        })
        
        documentTypes = documentTypesToShow;
        typeReferenceStrings = documentTypesToShow.map(type => type.reference);
    }).catch((err)=>{
        console.log("error " + err);
    });

    // search parameters in the request exist - parse them.
    if (Object.keys(req.query).length > 0){
        searchPostParameters = parseSearchParameters(req.query,typeReferenceStrings);
        res.cookie("searchPostParameters" , searchPostParameters);
    }
    // search parameters saved in a cookie exist - use them
    else if (req.cookies.searchPostParameters != null){
        searchPostParameters = req.cookies.searchPostParameters;
    }
    // initial search page
    else{
        searchPostParameters = setInitalSearchParameters(typeReferenceStrings);
    }
    var location = null;
    if(req.query.postcode != null && req.query.postcode.trim().length > 0)
    {
     await getLocation(req.query.postcode).then((response)=>{
        var address = response.data.address[0];
        searchPostParameters.location = {
            "latitude": address.latitude,
            "longitude": address.longitude,
            "unit": "MILE",
            "range": 10
        }
      }).catch((err)=>{
        console.log("error " + err);
    });
   
    }
    else{
        res.clearCookie("postcode");
    }
    await search(searchPostParameters).then((response)=>{

        documents = response.data.results;
        documents = setPrices(documents);
        documents = setAvailable(documents);

        // documents = sortResultsByProperty(documents,"price","high");
    }).catch((err)=>{
        console.log("error " + err);
    })
    documentTypes.forEach((type)=>{
        if(searchPostParameters.documentTypes.includes(type.reference))
            type.checked = "checked";
    })
    var availableOnly = false;
    if(searchPostParameters.parameters.length > 0)
        availableOnly = true;
    return res.render("search.html",{documentTypes : documentTypes, results : documents, searchParameters:searchPostParameters, postcode: req.query.postcode, available:availableOnly});
}

function parseSearchParameters(query,references){
    var typesParameters = [];

    references.forEach((ref)=>{
       if(query[ref])
          typesParameters.push(ref);
    });
    var testSearchTypes = ["bin-lid-advertising"];
   var  location = null;
   
   var parameters = [];
   if(query.available != null)
   {
       var availableParameter = {
    "reference": "available",
    "value": true
       };
       parameters.push(availableParameter);
   }
   else{
       parameters = [];
   }
   
  return  { documentTypes: typesParameters, location: location, parameters: parameters };
}

function setInitalSearchParameters(references){
  return  { documentTypes: references, location: null, parameters: [] };
}

function search(searchParameters){
    return axios.post( 'http://52.56.188.219/catalogue/v1/search/index/advertise',searchParameters);
  }

  function getDocumentTypes(){
    return axios.get('http://52.56.188.219/catalogue/v1/indexes/advertise');
  }

  function setPrices(documents){
      documents.forEach((document)=>{
          document.document.price = getPrice(document.document.properties);
      })
      return documents;
  }

  function getPrice(properties){
     for(var i=0;i<properties.length;i++){
          if(properties[i].propertyName == 'Price'){
            return properties[i].publishedValue;
          }
      }
  }

  function getLocation(postcode){
        return axios.get( 'https://apptest.dorsetcc.gov.uk/gazetteer/rest/address/postcode/'+postcode);
  }

  function setAvailable(documents){
      for(var i=0;i<documents.length;i++){
          documents[i].document.available = isAvailable(documents[i].document.properties)
      }
      return documents;
  }

  function isAvailable(properties){
    for(var i=0;i<properties.length;i++){
         if(properties[i].propertyName == 'Available'){
           return properties[i].publishedValue;
         }
     }
 }

  function  sortResultsByProperty(results, propertyReq, type) {
    return results.sort(function (a, b) {
        var aProperty = null;
        var bProperty = null;
        a.document.properties.forEach((property) => {
            if (property.propertyReference == propertyReq)
                aProperty = Number(property.publishedValue);                 
        })
        b.document.properties.forEach((property) => {
            if (property.propertyReference == propertyReq)
                bProperty = Number(property.publishedValue);                 
        })
        
        if(isNaN(aProperty))
            return 1;
        else if(isNaN(bProperty))
            return -1;
        else if(aProperty == 0)
            return 1
        else if(bProperty == 0)
            return -1
        
        if (type == 'high'){
            return bProperty - aProperty;
        }
        else{
            return aProperty - bProperty;
        }
    });
}
