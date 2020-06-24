const express = require('express');

//to parse the body data
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
app.use('/uploads',express.static('uploads'));

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