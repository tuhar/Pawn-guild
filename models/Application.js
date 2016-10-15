var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
   title: String,
   text: String,
   comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

var Application = mongoose.model('Application', applicationSchema);
module.exports = Application;