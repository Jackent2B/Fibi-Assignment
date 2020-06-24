const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	name:{
		type: String,
		required: true 
	},
	url:{
		type: String,
		required: true
	}
})

const Image = mongoose.model('image',imageSchema);
module.exports = Image;
