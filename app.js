const express = require("express");
const path = require("path");
var cookieParser = require('cookie-parser');
const nunjucks = require("nunjucks");
// const sassMiddleware = require("node-sass-middleware");



var app = express();
app.use(express.static('public'));
app.use(cookieParser());


// Page template configuration
var PATH_TO_TEMPLATES = './pages' ;
nunjucks.configure( PATH_TO_TEMPLATES, {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');
var router = require("./routes/routes.js");
app.use("/advertise",router);


/*
app.use(sassMiddleware({

    src: path.join(__dirname, 'public/scss'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    sourceMap: true,
    indentedSyntax : false,
    outputStyle: 'compressed'
  })); 
  */

// Declare assets location






const port=process.env.PORT || 3000
app.listen(port, () => {
    // a console.log() which triggers Nodemon's "stdout" event 
    console.log(`Express server listening on port 3000`);
  });

  
  module.exports = app;