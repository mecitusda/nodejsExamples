module.exports = (req,res,next) => {
    if(!req.user.role=="admin") return res.status(403).send('Access Denied: You are not an admin');
    next();
};