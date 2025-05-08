const routes = require("express").Router()
const userController = require("../controllers/UserController")


routes.post("/user",userController.signup);
routes.post("/user/login",userController.loginUser);
routes.post("/forgot-password", userController.forgotPassword);
routes.post("/reset-password/:token", userController.resetPassword);


module.exports = routes