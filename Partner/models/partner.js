const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// Çalışan modeli
const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    }
    ,
    email: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    service_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service_category',
    },

    commercial_activity_certificate:{//ticaret faaliyet belgesi
        type: String,
        required: true
    },

    certificate_of_affiliation:{//bağlı olduğu oda belgesi

        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'moderator'], // Kullanıcı, admin gibi roller arttırılıcak.
        default: 'moderator'
    },
    phone_verify_code:{
        type: String,
        required: false,
        expiresIn: '60s'
    }}, 
    {
    timestamps: true
    });

PartnerSchema.pre('save', async function(next){ //Her save() fonksiyonunda şifreyi otomatik hashleyecek.
    const partner = this;
    if(!partner.isModified('password')){
        next();
    }

    try{
        PartnerSchema.password = await bcrypt.hash(partner.password, 10);
        next();
    }catch(err){
        next(err);
    }
});

PartnerSchema.methods.comparePassword= function(candidatePassword){
    const partner = this;
    return bcrypt.compare(candidatePassword, partner.password);
}

PartnerSchema.methods.createAuthToken = function(){
    const partner = this;
    const token = jwt.sign({_id: partner._id,isAdmin:partner=="admin"?true:false}, process.env.TOKEN_SECRET,{expiresIn: '2m'});
    return token;
};



const Partner = mongoose.model('Partner', PartnerSchema);

module.exports = Partner;