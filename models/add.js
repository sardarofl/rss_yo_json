const config = require('../config/database');
var multer  =   require('multer');
var moment  =   require('moment');
var path = require('path');
const mongoose = require('mongoose');
const Room_schema = require('./room_schemas');
const Event_schema = require('./event_schemas');
const Place_schema = require('./place_schemas');
const Group_schema = require('./group_schemas');
const AccountsSchema = require('./accounts_schemas');
const SessionSchema = require('./session_schemas');

//multer
var filename_path;
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },

  filename: function (req, file, callback) {
    ////console.log(req);
    filename_path=file.fieldname + '-' + Date.now()+path.extname(file.originalname);
    callback(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
});

var upload = multer({ storage : storage}).single('image');
var multiple_upload = multer({ storage : storage}).array('image');


//adding items

const Add_Items={

  AddToRooms:function(req,res, callback){
    upload(req,res,function(err) {
        //console.log(req);
        //console.log("Adding Room");
    let newRoom = new Room_schema({
      room_name:req.body.room_name,
      room_place:req.body.room_place,
      room_default_logo:req.file.originalname,
      room_default_logo_path:req.file.filename,
      room_type:req.body.room_type,
      room_floor_number:req.body.room_floor_number,
      room_account_ID:req.body.room_account_ID,
      room_slider_ID:req.body.room_slider_ID
    });

      newRoom.save( callback, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
          //console.log("Room inserted to Collection");
        }
      });
    });
  },
  AddToOutlookRooms:function(req,res, callback){
    upload(req,res,function(err) {
        //console.log(req);
        //console.log("Adding Room");
    let newRoom = new Room_schema({
      room_name:req.body.room_name,
      room_place:req.body.room_place,
      room_default_logo:req.file.originalname,
      room_default_logo_path:req.file.filename,
      room_type:req.body.room_type,
      room_floor_number:req.body.room_floor_number,
      room_account_ID:req.body.room_account_ID,
      room_slider_ID:req.body.room_slider_ID,
      graph_access_token:req.body.graph_access_token,
      graph_refresh_token:req.body.graph_refresh_token,
      graph_token_expires:req.body.graph_token_expires,
      graph_user_name:req.body.graph_user_name
    });

      newRoom.save( callback, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
          //console.log("Room inserted to Collection");
        }
      });
    });
  },
  AddToWorkgroup:function(req,res, callback){

        upload(req,res,function(err) {
         console.log(req);
        var roomID_array=[];
        var room_Name=[];
        // var requesttoObject = JSON.parse(JSON.stringify(
        //     req.body
        // ));
        if(typeof req.body.roomID_Array === "undefined")
        {

        }else{

          console.log(req.body.roomID_Array.length);
          if(req.body.one === "one")
          {
            console.log("acknowleddged one")
              roomID_array=[{"roomID":req.body.roomID_Array}];
          }else{
            for(var i=0; i<req.body.roomID_Array.length; i++)
            {
              console.log(req.body.roomID_Array[i]);
              roomID_array.push({"roomID":req.body.roomID_Array[i],"room_Name":req.body.room_Name[i]});
            }
          }


        }
        console.log(req.body.workgroup_name);
        let newGroup = new Group_schema({
          account_ID:req.body.account_ID,
          workgroup_name:req.body.workgroup_name,
          roomID_Array:roomID_array
        });

        newGroup.save( callback, function (err, docs) {
          if (err){
              return console.error(err);
          } else {
            console.log("Event inserted to Collection");
          }
        });

        });
  },
  AddToSessions:function(req,res, callback){
    console.log('inside adding to session')
    // upload(req,res,function(err) {
      //console.log(req);
    let newSession = new SessionSchema({
      graph_access_token:req.body.graph_access_token,
      graph_refresh_token:req.body.graph_refresh_token,
      graph_token_expires:req.body.graph_token_expires,
      graph_user_name:req.body.graph_user_name

    });

    newSession.save( callback, function (err, docs) {
      if (err){
          return console.error(err);
      } else {
        console.log("Event inserted to Collection");
      }
    });

    // });
  },
  AddToEvents:function(req,res, callback){

    upload(req,res,function(err) {
    //console.log(req);
    var event_attendants=[];


    var start_date =new Date(req.body.start_date) ;

    var end_date = new Date( req.body.end_date);

    //console.log("start Date: "+start_date);
    //console.log("end Date: "+end_date);
    if(typeof req.body.event_attendants === "undefined")
    {

    }else{

      /////////////////////////////////
      if(req.body.one === "one")
      {
        console.log("acknowleddged one");
         console.log(req.body.event_attendants);
          event_attendants=[{"name":req.body.event_attendants}];
      }else{
        for(var i=0; i<req.body.event_attendants.length; i++)
        {
          console.log(req.body.event_attendants[i]);
          event_attendants.push({"name":req.body.event_attendants[i]});

        }
      }
      //////////////////////////

    }


    var originalname;
    console.log(req);
    if(typeof req.file=== "undefined"){
      originalname = '';
      filename = '';
    }else{
      originalname = req.file.originalname;
      filename = req.file.filename;
    }

    let newEvent = new Event_schema({
      event_name:req.body.event_name,
      event_room:req.body.event_room,
      event_room_id:req.body.event_room_id,
      event_place:req.body.event_place,
      event_start_time:start_date,
      event_end_time:end_date,
      event_logo:originalname,
      event_logo_path:filename,
      using_default_logo:req.body.using_default_logo,
      event_host_name:req.body.event_host_name,
      account_ID:req.body.account_id,
      event_attendants:event_attendants
    });


    newEvent.save( callback, function (err, docs) {
      if (err){
          return console.error(err);
      } else {
        //console.log("Event inserted to Collection");
      }
    });

    });
  },
  AddToPlaces:function(req,res, callback){
    upload(req,res,function(err) {
    let newPlace = new Place_schema({
      place_name:req.body.place_name,
      place_admin:req.body.place_admin,
      place_number_of_rooms:req.body.place_number_of_rooms,
      place_number_of_floors:req.body.place_number_of_floors
    });

      newPlace.save( callback, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
          //console.log("Place inserted to Collection");
        }
      });
    });
  },
  AddToAccounts:function(req,res, callback){
    upload(req,res,function(err) {
    let newAccount = new AccountsSchema({
      account_name:req.body.account_name,
      account_admin_id:req.body.account_admin_id,
      account_admin_name:req.body.account_admin_name,
      licensed_rooms:req.body.licensed_rooms
    });

    newAccount.save( callback, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
          //console.log("Place inserted to Collection");
        }
      });
    });
  }
};


module.exports=Add_Items;
