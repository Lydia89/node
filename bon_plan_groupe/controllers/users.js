const express = require('express');
const router = express.Router();

router.get('/users', function(req, res) {
    res.render('signup');
  });

module.exports = router;