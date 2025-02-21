const User = require('../models/User');
const jwt = require('jsonwebtoken');

//get logged user data
const getLoggedUserData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
    const id = decoded.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({ status: "success", data: user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//get data about user by id
const getUserData = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json({ status: "success", data: user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//update user data
const updateUserData = async (req, res) => {
    const id = req.params.id;
    const { name, surname, email, password } = req.body;
    try {
        const user = await User.findById(id);
        user.name = name;
        user.surname = surname;
        user.email = email;
        user.password = User.hashPassword(password);
        await user.save();

        res.status(200).json({ message: "success", data: user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}