module.exports = (req,res,next) => {
    if(!req.user.isAdmin) return res.status(403).send('Access Denied: You are not an admin');
    next();
};