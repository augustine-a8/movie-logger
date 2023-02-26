const express = require("express");
const authControllers = require("../controllers/auth-controllers");

const { loginController, registerController, meController } = authControllers;

const { Router } = express;

const AuthRouter = Router();

AuthRouter.post("/login", loginController);
AuthRouter.post("/register", registerController);
AuthRouter.get("/me", meController);

module.exports = AuthRouter;
