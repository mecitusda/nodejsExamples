const Employee = require('../models/partner');
const Service = require('../models/service');
const Company = require('../models/company');


module.exports.post_accept_employee = async(req, res) => {
    const {name,email,role,password,phone_number,companyId} = req.body;
    const employee = new Employee({name,email,role, password,phone_number, companyId});
    try {
        await employee.save();
        res.send('Employee added');
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.post_accept_employee_with_sms = async(req, res) => {};

module.exports.get_employees = async(req, res) => {
    try {
        const employees = await Employee.find().populate({path:'companyId',select:'name -_id',populate:{path:'services',select:'name -_id'}}).select('name email role -_id');
        res.send(employees);
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.post_create_service = async(req, res) => {
    const {name,price,companyId,status} = req.body;
    const service = new Service({name,price,companyId,status});
    try {
        await service.save();
        await Company.findByIdAndUpdate(companyId,{$push:{services:service._id}});
        res.send('Service added.');
    } catch (err) {
        res.send(err.message);
    }
}