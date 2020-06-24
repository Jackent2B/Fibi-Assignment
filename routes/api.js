const express = require('express');
//to fetch metaData
var im = require('imagemagick');
const router = express.Router();
const Image = require('../models/schema');
const imageType = require('image-type');

var path = require('path');


router.get('/',(req,res)=>{
	res.send("Welcome! write 'localhost:3000/images' to fetch images");
});

router.get('/images',(req,res,next)=>{
	Image.find({}).then((images)=>{
		res.send(images);
	})
});

router.post('/images',(req,res,next)=>{
	//console.log(req.body.image);
	// console.log(im.identify('https://images.unsplash.com/photo-1550275994-2bc88dc68637?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'));
	//Return the extension:
		// var ext = path.extname('https://images.unsplash.com/photo-1550275994-2bc88dc68637?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');
		// console.log(ext);
	const url = 'https://images.unsplash.com/photo-1550275994-2bc88dc68637?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
 		
		router.get(url, response => {
    		response.on('readable', () => {
        const chunk = response.read(imageType.minimumBytes);
        response.destroy();
        console.log(imageType(chunk).ext);
        //=> {ext: 'gif', mime: 'image/gif'}
    		});
		});

	Image.create(req.body).then((image)=>{
		res.send(image);
	})
	.catch(next);
});

module.exports = router;
