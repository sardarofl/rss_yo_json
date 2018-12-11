const express = require('express');
const router = express.Router();
const config = require('../config/database');
const mongoose = require('mongoose');
const Delete = require('../models/delete');


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
//delete category
router.delete('/delete_room/:id/:roomdefaultlogo',verifyToken,function(req,res){
	var item = req.params.id;
	var roomdefaultlogo = req.params.roomdefaultlogo;
	var res = res;
	Delete.DeleteFromRooms(item,roomdefaultlogo,res, function(err,callback){
		if(err) return res.json(err);
				 res.json(callback);
     });
});

//delete product
router.delete('/delete_attendant/:eventid/:attendantid',verifyToken,function(req,res){
	var eventid = req.params.eventid;
	var attendantid = req.params.attendantid;

	Delete.DeleteFromAttendants(eventid,attendantid,res, function(err,callback){
		if(err) return res.json(err);
				 res.json(callback);
     });
});

router.delete('/delete_event/:id/:eventlogopath',verifyToken,function(req,res){
	var item = req.params.id;
	var eventlogopath = req.params.eventlogopath;
	Delete.DeleteFromEvents(item,eventlogopath,res, function(err,callback){
		if(err) return res.json(err);
				 res.json(callback);
     });
});

router.delete('/delete_event/:id/',verifyToken,function(req,res){
	var item = req.params.id;
	Delete.DeleteFromEventsWithoutLogo(item,res, function(err,callback){
		if(err) return res.json(err);
				 res.json(callback);
     });
});


module.exports = router;
