const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: '61s' //her ihtimale karşı expire + 1 saniye
    }
});

const BlackList = mongoose.model('blackList', blackListSchema);

module.exports = BlackList;