const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
    username : {type: String},
    feedback : {type: String},
   


});
module.exports = mongoose.model('feedback', feedbackSchema);