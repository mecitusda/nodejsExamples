const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const CustomerShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    
}
    ,
    {
        timestamps: true
    }
);

CustomerShema.pre('save', async function(next){ //Her save() fonksiyonunda şifreyi otomatik hashleyecek.
    const user = this;
    if(!user.isModified('password')){
        next();
    }

    try{
        user.password = await bcrypt.hash(user.password, 10);
        next();
    }catch(err){
        next(err);
    }
});




CustomerShema.methods.comparePassword= function(candidatePassword){
    const user = this;
    return bcrypt.compare(candidatePassword, user.password);
} //Kullanıcıdan alınan şifreyi hashlenmiş şifre ile karşılaştıracak.

CustomerShema.methods.createAuthToken = function(){
    const user = this;
    const token = jwt.sign({_id: user._id,isAdmin:user.isAdmin}, process.env.TOKEN_SECRET,{expiresIn: '60s'});
    return token;
};

const User = mongoose.model('Customer', CustomerShema);

module.exports = User;