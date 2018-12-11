var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET /authorize. */
router.get('/cookie', async function(req, res, next) {
    // Get auth code
    const code = req.query.code;
    // If code is present, use it
    if (code) {
      console.log("authorizing now");
      let token;
  
      try {
        token = await authHelper.getTokenFromCodeCookie(code, res);
      } catch (error) {
        res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
      }
  
      // Redirect to home
      res.redirect('/admin/rooms');
    } else {
      // Otherwise complain
      res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
    }
  });



  /* GET /authorize. */
router.get('/database', async function(req, res, next) {
  // Get auth code
  const code = req.query.code;
  // If code is present, use it
  if (code) {
    console.log("authorizing now");
    let token;

    try {
      token = await authHelper.getTokenFromCodeDatabase(code, res);
    } catch (error) {
      res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
    }

    // Redirect to home
    res.redirect('/admin/rooms');
  } else {
    // Otherwise complain
    res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
  }
});

  /* GET /authorize/signout */
router.get('/signout', function(req, res, next) {
    authHelper.clearCookies(res);
  
    // Redirect to home
    res.redirect('/');
  });

module.exports = router;