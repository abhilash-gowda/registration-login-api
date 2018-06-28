const mongoose = require('mongoose');
var minuteFromNow = function(){
   var d = new Date();
    d.setHours(d.getHours() + 5);
	d.setMinutes(d.getMinutes() + 30);
    var n = d.toLocaleString();
	return n;
};

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true,
        //email regex (email validation)
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    fname: { type: String, required: false },
    mname: { type: String, required: false },
    lname: { type: String, required: false },
    weight: { type: Number, required: false },
    height: { type: Number, required: false },
    phone: { type: Number, required: false },
    medical_con: { type: String, required: false },
    pain_areas: { type: String, required: false },
    medications: { type: String, required: false },
    experience: { type: String, required: false },
    createdAt : { type : String, default: minuteFromNow }

});

module.exports = mongoose.model('User', userSchema);

