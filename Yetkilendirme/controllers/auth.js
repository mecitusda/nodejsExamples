const User = require('../models/customer');
const blackList = require('../models/blacklist');
const partner_application = require('../models/partner_application');
const partner = require('../models/partner');
const generateOTP = require('../helpers/OTP');
const mailSender = require('../helpers/send_Mail');


module.exports.get_login = (req, res) => {
    res.render('login');
};


module.exports.get_register = (req, res) => {
    res.render('register');
};

module.exports.post_register = async(req, res) => {
    try { 
        const user = await  User.create(req.body);
        const token = user.createAuthToken();
        return res.header('x-auth-token', token).send(user);
    }catch(err){
        console.log(err);
    }

};


module.exports.get_logout = async(req, res) => {
    const token = req.header('x-auth-token');
    try{
        const addToken = await blackList.create({token: token});
        if(!addToken){
            return res.status(400).send('Token is already exist');
        }
        await addToken.save();
        return res.status(200).send('Token is blacklisted');
        
    }catch(err){
        console.log(err);
    }
};



//Ciddi yazılan kodlar


module.exports.post_login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send('Email or password is not provided');
    }
    try{
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).send('User is not found');
        }
        const checkpass = await user.comparePassword(password); 
        if(!checkpass){
            return res.status(400).send('Password is not correct');
        }
        const token = user.createAuthToken();
        res.header('x-auth-token', token).send(user);
    }catch(err){
        console.log(err);
    }
    
};


module.exports.post_register_partner = async (req, res) => {
    const {name, last_name,phone_number, email, address, service_category, commercial_activity_certificate, certificate_of_affiliation} = req.body;
    

    if(!name || !last_name || !phone_number || !email || !address || !service_category || !commercial_activity_certificate || !certificate_of_affiliation){
        return res.status(400).send('All fields are required');
    }
    try{
        const application = await partner_application.create(req.body);
        mailSender.sendMail(email,mailSender.partnerbasvuru,application.name);
        if(!application){return res.status(400).send('Application is not created');}
        return res.send(application);
    }catch(err){
        return console.log(err);
    }
}

module.exports.post_verify_register_partner = async (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).send('Id is required');
    }
    try{
        const application = await partner_application.findById(id);
        if(!application){return res.status(400).send('Application is not found');}

        const { _id, createdAt, updatedAt, ...partnerData } = application._doc || application;
        const password = generateOTP();
        const tpartner = await partner.create({...partnerData,password,role:'admin'});

        if(!tpartner){return res.status(400).send('Partner is not created');}

        mailSender.sendMail(tpartner.email,mailSender.partnerbasvuru_onay,tpartner.name,password);
        
        return res.send(tpartner);
    }catch(err){
        return console.log(err);
    }
};