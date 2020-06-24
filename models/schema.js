const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metaDataSchema = new Schema({
	Size:{
		type: Number
	},
	extType: {
		type: String
	}
});

const imageSchema = new Schema({
	name:{
		type: String,
		required: true 
	},
	url:{
		type: String,
		required: true
	},
	type:{
		type: String,
		required: true	
	},
	metaData:[metaDataSchema]
});

const Image = mongoose.model('image',imageSchema);
module.exports = Image;

