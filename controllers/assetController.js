const axios = require("axios");
const documentService = require("../services/documentService");
exports.asset = async function(req,res){
    var properties = null;
    var document= null;
    await documentService.getDocument(req.params.asset).then((response)=>{
        document = response.data;
        document.availabilityDescription = documentService.getAvailabilityDescription(document.properties);
        document.availabilityStatus = documentService.getAvailabilityStatus(document.properties);

        properties = documentService.getOtherProperties(document.properties);
    });
    return res.render( 'asset.html',{asset:document,properties:properties});
};
