const twilio = require('twilio');
const client = new twilio(process.env.ACCOUNT_SID, process.env.SMS_AUTH_TOKEN);

async function sendVerificationCode(phoneNumber) {
    const Vcode = Math.floor(100000 + Math.random() * 900000); // 6 haneli kod oluşturma
    
    await client.messages
    .create({
        body: 'your verification code is: ' + Vcode,
        from: process.env.PHONE_NUMBER,
        to: phoneNumber
    })
    .then(message => console.log(message.sid));
        

    return Vcode; // Veritabanında geçici olarak saklayabilirsiniz
    
}

module.exports = sendVerificationCode;