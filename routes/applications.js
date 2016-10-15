var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Application = mongoose.model('Application');
var Comment = mongoose.model('Comment');


router.get('/', function(req, res, next) {
	Application.find()
      .populate("comments")
      .exec(function(err, applications){
         if (err) {
            return next(err);
         }
         res.json(applications);
      });
});

router.post('/', function(req, res, next){
   Application.create(req.body, function(err, application){
      if (err) {
         return next(err);
      }
      res.json(application);
   });
});

router.get('/:id/comments', function(req, res, next){
   Comment.find(function(err, comments){
      if (err){
         return next(err);
      }
      res.json(comments);
   })
})

router.post('/:id/comments', function(req, res, next){
   Comment.create(req.body, function(err, comment){
      if (err) {
         return next(err);
      }
      Application.findById(comment.application, function(err, application) {
         if (err) {
            return next(err);
         }
         console.log(comment);
         application.comments.push(comment);
         application.save(function (err) {
             if (err) return handleError(err);
             Application
             .findById(application._id)
             .populate({ path: 'comments'})
             .exec(function (err, application) {
               if (err) return handleError(err);
             })
           })
      });
      res.json(comment);
   });
});

router.delete('/:id/comments/:commentId', function(req, res, next) {
   Comment.findById(req.params.commentId)
      .remove()
      .exec(function(err) {
         if (err){
            return next(err);
         }
         res.status(200).end();
      });
});

router.get('/:id', function(req, res, next){
   Application.findById(req.params.id, function (err, application) {
      if (err) {
         return next(err);
      }
      res.json(application);
   });
});

router.put('/:id', function(req, res, next){
   Application.findByIdAndUpdate(req.params.id, req.body, function(err, application) {
      if (err) {
         return next(err);
      }
      res.json(application);
   })
});

router.delete('/:id', function(req, res, next) {
   Application.findById(req.params.id)
      .remove()
      .exec(function(err) {
         if (err){
            return next(err);
         }
         res.status(200).end();
      });
});

module.exports = router;