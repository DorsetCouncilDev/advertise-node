exports.home = async function(req,res){
    return res.render( 'index.html',{name:"adam"});
};