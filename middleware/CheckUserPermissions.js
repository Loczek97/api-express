const jwt = require('jsonwebtoken');

const checkUserPermissions = (req, res, next) => {
    const token = req.header('Authorization');
    const jwtKey = process.env.JWT_SIGNATURE;

    if (!token) {
        return res.status(401).json({ status: "fail", message: "Brak dostępu" });
    }

    try {
        const decoded = jwt.verify(token, jwtKey);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ status: "fail", message: "Brak dostępu" });
    }

    next();
}