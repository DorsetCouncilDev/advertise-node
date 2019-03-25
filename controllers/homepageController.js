const documentService = require("../services/documentService");

exports.home = function(req,res){
    
  var documentTypes = [];

  documentTypes.push({"name":"Roundabout sponsorship","reference":"roundabout-sponsorship","tagline":"Over 80 roundabouts in high traffic areas"});
  documentTypes.push({"name":"Bin lid advertising","reference":"bin-lid-advertising","tagline":"Unique and highly targeted"});
  documentTypes.push({"name":"Car Parking Ticket Advertising","reference":"car-parking-ticket-advertising","tagline":"Directly into the hands of your audience"});
  documentTypes.push({"name":"Vehicle Advertising","reference":"vehicle-advertising","tagline":"Create a moving billboard"});
  documentTypes.push({"name":"Bus Shelter Posters","reference":"bus-shelter-posters","tagline":"Prime seafront advertising in Weymouth"});
  documentTypes.push({"name":"Boundary Signage Sponsorship","reference":"boundary-signage-sponsorship","tagline":"Welcome to Dorset, home of 'your business'"})
    return res.render( 'index.html',{"documentTypes":documentTypes});
};