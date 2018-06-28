const mongoose = require('mongoose');

const tipSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: { type: String, required: true },
    health_tip: { type: String, required: true },
    
    h_time : { type : Date, default: Date.now }

});

module.exports = mongoose.model('Tip', tipSchema);

