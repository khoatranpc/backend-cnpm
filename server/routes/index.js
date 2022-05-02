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
// cần phải quyền đăng nhập trước và có quyền admin mới có thể thêm
Router.post('/tour/add-tour', middleware.checkLogin, TourController.addTour);

//api get all tour, pagination page=?
Router.get('/tour/get-all-tour', TourController.getAllTour);

//api get tour by option
Router.get('/tour/search', TourController.getTourByOption);

//api get one tour
Router.get('/tour/:id', TourController.getOneTour);

//api update one tour
Router.put('/tour/update/:id', middleware.checkLogin, TourController.updateTour);







module.exports = Router;