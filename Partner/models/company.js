const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    taxId: {
        type: Number,
        required: true,
        unique: true
    },
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: false
    },
    services:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'offeredService',
        required: false
    }],
    status: {
        type: String,
        required: true,
        enum: ['pending','accepted','rejected'],
        default: 'pending'
    }},
    {
    timestamps: true
});

const company = mongoose.model('Company', companySchema);

module.exports = company;