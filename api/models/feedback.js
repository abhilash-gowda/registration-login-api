const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    high: { type: Number, required: false },
    mid: { type: Number, required: false },
    low: { type: Number, required: false },
    f_time : { type : Date, default: Date.now }

});

module.exports = mongoose.model('Feedback', feedbackSchema);

