const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Çalışan modeli
const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },  
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    service_category:{
        type: String,//buraya kategori gelecek
        required: true
    },
    commercial_activity_certificate:{//ticaret faaliyet belgesi
        type: String,
        required: true
    },
    certificate_of_affiliation:{//bağlı olduğu oda belgesi
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
}, 
    {
    timestamps: true
    });



/*PartnerSchema.methods.createAuthToken = function(){
    const partner = this;
    const token = jwt.sign({_id: partner._id}, process.env.TOKEN_SECRET,{expiresIn: '10'});
    return token;
};
*/


const Partner = mongoose.model('Partner_application', PartnerSchema);

module.exports = Partner;