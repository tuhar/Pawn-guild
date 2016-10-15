var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
   body: String,
   author: String,
   application: {type: mongoose.Schema.Types.ObjectId, ref: 'Application'}
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;