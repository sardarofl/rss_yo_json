const express = require('express');
const router = express.Router();
const config = require('../config/database');
const mongoose = require('mongoose');
const Fetch = require('../models/fetch');
const Set = require('../models/set');
var graph = require('@microsoft/microsoft-graph-client');
let Parser = require('rss-parser');
let parser = new Parser();




//get Auth URL
router.get('/getRSS/:url', async function(req,res){
	var url = req.params.url;


	let feed = await parser.parseURL(url);

	res.json(feed)

});





module.exports = router;
