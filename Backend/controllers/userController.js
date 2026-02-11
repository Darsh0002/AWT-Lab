const User = require("../models/User");

exports.addUser = async (req,res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch(err){
        res.status(500).json({error:err.message});
    }
};
