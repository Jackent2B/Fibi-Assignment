const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var im = require('imagemagick');
// const readChunk = require('read-chunk');
// const imageType = require('image-type');
var path = require('path');
//Return the extension:
// var ext = path.extname('/Users/Refsnes/demo_path.js');
// console.log(ext);


//connection with database
var url = process.env.DATABASEURL || "mongodb://localhost/fibi";
mongoose.connect(url,{useNewUrlParser: true});

mongoose.Promise = global.Promise;

//created the express app
const app = express();
//imported routes from 'api.js' file
const routes = require('./routes/api');

//using body-parser
app.use(bodyParser.json());

//initialisation of routes
app.use(routes);

//error handling
app.use((err,req,res,next)=>{
	res.status(422).send({err: err.message})
})

var Port = process.env.PORT || 3000;

app.listen(Port,(req,res)=>{
	console.log("Hey! Server is listening");
});