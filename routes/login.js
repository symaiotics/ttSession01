var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send('You are Logged In')
});

//export the router back to the index.js page
module.exports = router;