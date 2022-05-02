const Router = require('express').Router();
const middleware = require('../middlewares');

const AuthController = require('../modules/Auth');
const TourController = require('../modules/Tours');
//apis login
Router.post('/auth/login', AuthController.SignIn);
//apis signup
Router.post('/auth/signup', AuthController.SignUp);
//apis request OTP
Router.post('/auth/sending-otp', AuthController.requireOTP);
//apis resetpassword
Router.put('/auth/reset-password', AuthController.resetPassword);

// owner admin

//apis add tour
Router.post('/tour/add-tour', middleware.checkLogin,TourController.addTour);


module.exports = Router;