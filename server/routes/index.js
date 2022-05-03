const Router = require('express').Router();
const middleware = require('../middlewares');

const AuthController = require('../modules/Auth');
const TourController = require('../modules/Tours');
const CostumerController = require('../modules/Costumers');
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

//api delete tour
Router.delete('/tour/delete/:id', middleware.checkLogin, TourController.deleteTour);


//api detail book tour
Router.get('/tour/detail/:id', TourController.getDetailTour);


// API dành cho khách hàng
// get infor current user
Router.get('/user/current-user', middleware.checkLogin, CostumerController.getDataInfor);

//update thông tin
Router.put('/user/current-user/update', middleware.checkLogin, CostumerController.updateDataInfor);





module.exports = Router;