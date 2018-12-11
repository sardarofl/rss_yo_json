const config = require('../config/database');
const mysql = require('mysql');
var path = require('path');
const mongoose = require('mongoose');
// const Gallery_schema = require('./gallery_schemas');
const Event_schema = require('./event_schemas');
const Room_schema = require('./room_schemas');
var multer  =   require('multer');
//adding items

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
const Set_Desc_Title={

  // Set:function(title, desc, id, res,callback){
  //   var data = {
  //     "Data":""
  //   };

  //   //console.log("SRC "+id);
  //   //config.query("UPDATE product_media SET title = ?, description = ? WHERE src LIKE'%"+id+"%'", [title,desc], function (err, result) {
  //   //  if (err) throw err;
  //   //  res.json(data);
  //   // });

  //     Gallery_schema.updateMany(
  //        { src:id},
  //        { description: desc,title: title },callback
  //     );


  // },
  SetMeetingData:function(req,res, callback){
    upload(req,res,function(err) {
      console.log(req);

      if(typeof req.file=== "undefined"){
        Event_schema.findByIdAndUpdate(req.body.event_id,{ $set: { 'event_name': req.body.event_name,
      'event_host_name':req.body.event_host_name,
      'event_start_time':req.body.start_date,
      'event_end_time':req.body.end_date,
      'event_room':req.body.event_room,
      'event_room_id':req.body.event_room_id
    }},callback);
      }
      else{
        Event_schema.findByIdAndUpdate(req.body.event_id,{ $set: { 'event_name': req.body.event_name,
        'event_host_name':req.body.event_host_name,
        'event_start_time':req.body.start_date,
        'event_end_time':req.body.end_date,
        'event_room':req.body.event_room,
        'event_room_id':req.body.event_room_id,
        'event_logo:':req.file.originalname,
        'event_logo_path':req.file.filename
      }},callback);

      }

      


  });

  },
  SetRoomData:function(req,res, callback){
    upload(req,res,function(err) {
      console.log(req);
      //console.log()

      if(typeof req.file=== "undefined"){
        Room_schema.findByIdAndUpdate(req.body.room_id,{ $set: { 'room_name': req.body.room_name,'room_type':req.body.room_type,'room_floor_number':req.body.room_floor_number }},callback);
      }
      else{
        Room_schema.findByIdAndUpdate(req.body.room_id,{ $set: { 'room_name': req.body.room_name,'room_type':req.body.room_type,'room_floor_number':req.body.room_floor_number, 'room_default_logo':req.file.originalname, 'room_default_logo_path':req.file.filename }},callback);

      }

    

  });

  },
  SetRoomToken_Outlook:function(room_id,graph_access_token, callback){

      console.log("enta yabny: ", room_id)
        Room_schema.findByIdAndUpdate(room_id,{ $set: { 'graph_access_token': graph_access_token}},callback);


  }

};


module.exports=Set_Desc_Title;
