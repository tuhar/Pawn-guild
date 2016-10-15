var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Application = mongoose.model('Application');
var Comment = mongoose.model('Comment');

router.post('/', function(req, res, next){
   Application.create(req.body, function(err, application){
      if (err) {
         return next(err);
      }
      res.json(application);
   });
});

module.exports = router;