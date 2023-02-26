const AuthModel = require("../models/auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const { SECRET_KEY } = config;

const loginController = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({
            message: "Enter username and password",
        });
    }
    const user = await AuthModel.findOne({ username });
    if (!user || user === undefined) {
        res.status(404).send({
            message: `User with username: ${username} doesn't exist`,
        });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        res.status(403).send({
            message: "Incorrec password",
        });
    }

    const token = jwt.sign(
        { username: user.username, id: user._id },
        SECRET_KEY
    );

    res.status(200).send({
        message: "Login successful",
        token,
    });
};

const registerController = async (req, res) => {
    const { username, fullName, password } = req.body;
    if (!username || !fullName || !password) {
        res.status(400).send({
            message: "Please complete register form",
        });
        return;
    }

    const existingUser = await AuthModel.findOne({ username });
    if (existingUser) {
        res.status(400).send({
            message: `Username: ${username} has already been taken`,
        });
        return;
    }

    const hashPassword = bcrypt.hashSync(password, 12);

    const newUser = new AuthModel();
    newUser.username = username;
    newUser.fullName = fullName;
    newUser.password = hashPassword;

    const user = await newUser.save();
    const token = jwt.sign(
        { username: user.username, id: user._id },
        SECRET_KEY
    );

    res.status(200).send({
        message: "Login successful",
        token,
    });
};

const meController = async (req, res) => {
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
            message: "User does not exist",
        });
        return;
    }

    res.status(200).send({
        message: "User found",
        user: {
            username: user.username,
            fullName: user.fullName,
        },
    });
};

module.exports = {
    registerController,
    loginController,
    meController,
};
