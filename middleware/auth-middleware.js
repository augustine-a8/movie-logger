const jwt = require("jsonwebtoken");
const config = require("../config");
const AuthModel = require("../models/auth-model");

const { SECRET_KEY } = config;

const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).send({
            message: "Authorization header must be provided",
        });
        return;
    }
    const token = authHeader.split("Bearer ")[1];
    if (!token) {
        res.status(403).send({
            message: "Authentication token should be provided",
        });
        return;
    }

    let payload;
    try {
        payload = jwt.verify(token, SECRET_KEY);
    } catch (err) {
        console.log("JWT::VERFICATION::ERROR: ");
        throw new Error(err);
    }

    const user = await AuthModel.findOne(payload);
    if (!user) {
        res.status(404).send({
            message: "Incorrect jwt provided",
        });
        return;
    }

    res.locals.user = user;

    next();
};

module.exports = checkAuth;
