const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { email, password, name, surname, role } = req.body;

    try {
        const userExists = await User.checkEmail(email);
        if (userExists) {
            return res.status(400).json({ status: "fail", message: "Użytkownik o podanym adresie email już istnieje." });
        }

        const user = await User.create({ email, password, name, surname, role });
        res.status(201).json({ status: "success", message: "Użytkownik został zarejestrowany.", data: user });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    const jwtKey = process.env.JWT_SIGNATURE;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ status: "fail", message: "Niepoprawny email lub hasło." });
        }

        const isPasswordCorrect = await user.checkPassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ status: "fail", message: "Niepoprawny email lub hasło" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, jwtKey, { expiresIn: '1h' });
        return res.status(200).json({ status: "success", message: "Zalogowano pomyślnie.", data: { token, user: user.toSend() } });

    }
    catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

module.exports = { register, login };