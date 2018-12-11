const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Add = require('../models/add');
const passport = require('passport');
const jwt = require('jsonwebtoken');


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

//add rooms
// router.post('/testToken', verifyToken,function(req,res){
// 	res.json({
// 		message:'Post Created...'
// 	});
// });

// router.post('/testTokenNo',function(req,res){
// 	res.json({
// 		message:'Post Created...'
// 	});
// });

//add rooms
router.post('/add_room', verifyToken,function(req,res){
	var req = req;
	var res = res;

	  Add.AddToRooms(req,res, (err, category) =>{
	    if(err){
	     res.json({success:false, msg:'Failed to Add room'});
	    }else{
	     res.json({success:true, msg:'Room Added'});
	    }
	  });
});

//add outlook rooms
router.post('/add_outlook_room', verifyToken,function(req,res){
	var req = req;
	var res = res;

	  Add.AddToOutlookRooms(req,res, (err, category) =>{
	    if(err){
	     res.json({success:false, msg:'Failed to Add outlook room'});
	    }else{
	     res.json({success:true, msg:'Room Added'});
	    }
	  });
});


//add workgroup
router.post('/add_workgroup',verifyToken,function(req,res){
	var req = req;
	var res = res;

	  Add.AddToWorkgroup(req,res, (err, category) =>{
	    if(err){
	     res.json({success:false, msg:'Failed to Add workgroup'});
	    }else{
	     res.json({success:true, msg:'Room workgroup added'});
	    }
	  });
});

//add account
router.post('/add_account',verifyToken,function(req,res){
	var req = req;
	var res = res;

	  Add.AddToAccounts(req,res, (err, category) =>{
	    if(err){
	     res.json({success:false, msg:'Failed to Add account'});
	    }else{
	     res.json({success:true, msg:'account added'});
	    }
	  });
});

//add events
router.post('/add_event',verifyToken,function(req,res){
	var req = req;
	var res = res;
	Add.AddToEvents(req, res, function(err,rows){
		if(err){
		 res.json({success:false, msg:'Failed to add event'});
		}else{
		 res.json({success:true, msg:'Event Added'});
		}
     });
});

//add place
router.post('/add_place',verifyToken,function(req,res){
	var req = req;
	var res = res;
	Add.AddToPlaces(req, res, function(err,rows){
		if(err){
		 res.json({success:false, msg:'Failed to Add Place'});
		}else{
		 res.json({success:true, msg:'Place Added'});
		}
    });
});




module.exports = router;
