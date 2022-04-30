const Router = require('express').Router();
const AuthController = require('../modules/Auth');

//apis login
Router.post('/auth/login', AuthController.SignIn);
//apis signup
Router.post('/auth/signup', AuthController.SignUp);
module.exports = Router;