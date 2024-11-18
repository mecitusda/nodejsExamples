const crypto = require('crypto');

function generateOTP() {
    const otp = crypto.randomInt(100000, 999999); // 6 basamaklı bir sayı
    return otp.toString();
}

module.exports = generateOTP;
