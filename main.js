const express = require("express");
const nunjucks = require("nunjucks");
const sassMiddleware = require("node-sass-middleware");
const axios = require("axios");
const path = require("path");

var app = express();

// Compile sass files to css
app.use(sassMiddleware({
    src: path.join(__dirname, 'public/scss'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    sourceMap: true,
    indentedSyntax : false,
    outputStyle: 'compressed'
  })); 

// Declare assets location
app.use(express.static(path.join(__dirname, 'public')));

// Page template configuration
var PATH_TO_TEMPLATES = './pages' ;
nunjucks.configure( PATH_TO_TEMPLATES, {
    autoescape: true,
    express: app
});

// routes
app.get( '/', function( req, res ) {
    return res.render( 'index.html') ;
});

app.get( '/search', function( req, res ) {
    return res.render( 'search.html') ;
});

app.get( '/asset', function( req, res ) {

});

// run local server
app.listen( 3000 );