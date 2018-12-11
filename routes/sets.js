const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Set = require('../models/set');

function verifyToken(req,res,next){
	
	const bearerHeader = req.headers['authorization'];

	if(typeof bearerHeader !== 'undefined'){
		const bearer = bearerHeader.split(' ');
		//get token from array
		const bearerToken = bearer[1];
		req.token = bearerToken;
		//next middle ware
		next();
	}else{
		res.sendStatus(403);
	}
}

//set title
router.post('/set_desc_title',verifyToken,function(req,res){
	//var req = req;
	//var res = res;
	console.log("description is "+req.body.description);
	var title = req.body.title;
	var desc = req.body.description;
	var id = req.body.id;
	Set.Set(title, desc, id, res,function(err,callback){
		if(err) return res.json(err);
				 res.json(callback);
     });
});

//set meeting data
router.put('/set_meetingdata',verifyToken,function(req,res){
	var req = req;
	var res = res;

	  Set.SetMeetingData(req,res, (err, category) =>{
	    if(err){
	     res.json({success:false, msg:'Failed to set meeting data'});
	    }else{
	     res.json({success:true, msg:'Meeting Data Set'});
	    }
	  });
});

//set room data
router.put('/set_roomdata',verifyToken,function(req,res){
	var req = req;
	var res = res;

	  Set.SetRoomData(req,res, (err, category) =>{
	    if(err){
	     res.json({success:false, msg:'Failed to set room data'});
	    }else{
	     res.json({success:true, msg:'Room Data Set'});
	    }
	  });
});


module.exports = router;
