const express = require('express')
const authenticate = require('../middlewares/authenticate')
authController = require('../controller/auth-controller')
authRouter = express.Router()


authRouter.post('/register',authController.register)
authRouter.post('/login',authController.login)
authRouter.post('/getData',authenticate,authController.getData)


module.exports = authRouter