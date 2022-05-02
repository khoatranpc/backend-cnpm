const Router = require('express').Router();
const middleware = require('../middlewares');

const AuthController = require('../modules/Auth');
const TourController = require('../modules/Tours');

// APIs authen
//api login
Router.post('/auth/login', AuthController.SignIn);
//api signup
Router.post('/auth/signup', AuthController.SignUp);
//api request OTP
Router.post('/auth/sending-otp', AuthController.requireOTP);
//api resetpassword
Router.put('/auth/reset-password', AuthController.resetPassword);

//APIs tour

//api add tour
Router.post('/tour/add-tour', middleware.checkLogin, TourController.addTour);
//api get all tour
Router.get('/tour/get-all-tour', TourController.getAllTour);



module.exports = Router;