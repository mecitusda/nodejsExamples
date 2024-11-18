const Company = require('../models/company');
const employee = require('../models/partner');
const sendSMS = require('../helpers/sms-verify');



module.exports.post_login_without_media = async(req,res) => {//telefon veya email ile giriş yapılacak.
    
    console.log(req.body.phone_number)
    const {email=null, password=null,phone_number=null,facebook=null} = req.body;
    
    try{
        if(email){
            const employeecheck = await employee.findOne({email: email});
            if(!employeecheck) return res.send('Invalid email or password');
            const checkpass = await employeecheck.comparePassword(password); 
            if(!checkpass) return res.send('Invalid email or password');
            const token = employeecheck.createAuthToken();
            res.header('x-auth-token', token).send(employeecheck);
    
        }
        else if(phone_number){
            const employeecheck = await employee.findOne({phone_number: phone_number});
            if(!employeecheck) return res.send('Invalid phone number or password');
            const code = await sendSMS(phone_number);//{code, response}
            console.log(code)
            employeecheck.phone_verify_code = code;
            await employeecheck.save();
            return res.render("pages/verify",{});
        }

      
    }catch(err){
        res.send(err.message);
    }
  
}

module.exports.post_register_company = async(req, res) => {
    const {name, address, taxId} = req.body;
    const company = new Company({name, address, taxId});
    try {
        await company.save();
        res.send('Company registered');
    } catch (err) {
        res.send(err.message);
    }
}   

module.exports.post_register_employee = async(req, res) => {
    res.send('register employee');//Burada çalışan üyelik isteği yollanacak.
}

module.exports.get_verify = async(req, res) => {
    res.render('pages/verify');
}
module.exports.post_verify = async(req, res) => { 
   
    const {code} = req.body;
    try{
        const employeecheck = await employee.findOne({phone_verify_code: code});
        if(!employeecheck) return res.send("Invalid code");
        const token = employeecheck.createAuthToken();
        return res.header('x-auth-token', token).render('pages/verified');
    }catch(err){
        res.send(err.message);
    }

 };

 module.exports.post_login_facebook = async(req, res) => {
    const {token} = req.body
    if(!token) return res.send('Invalid token');
    const facebook = await fetch('https://graph.facebook.com/v11.0/me?fields=id,name,email&access_token='+token);
    const data = await facebook.json();
    console.log(data);
    res.send(data);
 };