const express = require('express');
//to fetch metaData
const router = express.Router();
const Image = require('../models/schema');

//to upload files
const multer = require('multer');
 
// for storage of file with some specifications in the disk
const storage = multer.diskStorage({
	destination: (req,file,cb)=>{
		cb(null,'./uploads/');
	},
	filename: (req,file,cb)=>{
		cb(null,file.originalname);
	}
})

const upload = multer({storage: storage});

var path = require('path');


router.get('/',(req,res)=>{
	res.send("Welcome! write 'localhost:3000/images' to fetch images");
});

router.get('/images',(req,res,next)=>{
	Image.find({}).then((images)=>{
		res.send(images);
	})
});

router.post('/images',upload.single('specialImage'),(req,res,next)=>{
	//console.log(req.file);

	var ext = path.extname(req.file.filename);
	// console.log(ext);

	Image.create({
		name:req.body.name,
		url: req.body.url,
		type: req.file.mimetype,
		metaData:[{
			Size: req.file.size,
			extType: ext
		}]
	}).then((image)=>{
		res.send(image);
	})
	.catch(next);
});

module.exports = router;
