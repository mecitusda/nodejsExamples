const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active','inactive'],
        default: 'active'
    }},
    {
    timestamps: true
});

const service = mongoose.model('offeredService', serviceSchema);

module.exports = service;