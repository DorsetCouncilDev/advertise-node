exports.contact = function(req,res){

    var action = req.params.action;
    var assetRef = req.params.assetref;
    var message = null;
    if(typeof action !== 'undefined' && typeof assetRef !== 'undefined')
    {
        if(action == 'waitinglist')
            message = 'Please add me to the waiting list for ' + assetRef;
        else if(action == 'book')
            message = 'I would like to book ' + assetRef;
    }
    return res.render( 'contact.html',{message:message,assetRef:assetRef});
};