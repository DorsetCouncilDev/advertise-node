const axios = require("axios");
const searchService = require("../services/searchService");
const documentService = require("../services/documentService");


/*  HTTP Logging    */
/*
axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })
*/

exports.search = async function(req,res){
    var documentTypes; 
    var searchPostParameters;
    var documents;
    var typeReferenceStrings;
    
    res.cookie("name" , "Adam");

    await  documentService.getDocumentTypes().then((response)=>{
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

    var selectedView = "list";
    if(req.cookies.selectedView != null)
            selectedView = req.cookies.selectedView;

    // search parameters in the request exist - parse them.
    if (Object.keys(req.query).length > 0){
        searchPostParameters = searchService.parseSearchParameters(req.query,typeReferenceStrings);
        res.cookie("searchPostParameters" , searchPostParameters);
    }
    // search parameters saved in a cookie exist - use them
    else if (req.cookies.searchPostParameters != null)
        searchPostParameters = req.cookies.searchPostParameters;  
    // initial search page
    else
        searchPostParameters = searchService.setInitalSearchParameters(typeReferenceStrings);

    var location = null;
    if(req.query.postcode != null && req.query.postcode.trim().length > 0)
    {
     await documentService.getLocation(req.query.postcode).then((response)=>{
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
    await searchService.search(searchPostParameters).then((response)=>{

        documents = response.data.results;
        documents = documentService.setPrices(documents);
        documents = documentService.setAvailable(documents);

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
    return res.render("search.html",{documentTypes : documentTypes, results : documents, searchParameters:searchPostParameters, postcode: req.query.postcode, available:availableOnly, selectedView: selectedView});
}