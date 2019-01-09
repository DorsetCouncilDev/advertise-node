const axios = require("axios");

exports.asset = async function(req,res){
    var document= null;
    await getDocument(req.params.asset).then((response)=>{
        document = response.data;
    });
    return res.render( 'asset.html',{asset:document}) ;
};

function getDocument(documentReference){
    return axios.get('http://52.56.188.219/catalogue/v1/indexes/advertise/documents/' + documentReference);
  };