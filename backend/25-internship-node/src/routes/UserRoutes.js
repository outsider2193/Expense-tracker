const routes = require("express").Router()
const userController = require("../controllers/UserController")


routes.post("/user",userController.signup)
routes.get("/user/:id",userController.getUserById)
routes.post("/user/login",userController.loginUser)


module.exports = routes