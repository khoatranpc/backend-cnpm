const Router = require('express').Router();
const middleware = require('../middlewares');

const AuthController = require('../modules/Auth');
const TourController = require('../modules/Tours');
const UserContorller = require('../modules/Users');
const AdminController = require('../modules/Admin');
const { Route } = require('express');
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


//api add Tour Guide
Router.put('/tour/add-Tour-Guide/:id_tour', middleware.checkLogin, TourController.addTourGuide);


//api detail book tour
Router.get('/tour/detail/:id', TourController.getDetailTour);

// get detail tour and update for admin

Router.put('/admin/admin-controller/tour/:id_tour/update', middleware.checkLogin, TourController.getDetailTourAndUpdate);

// API dành cho khách hàng
// get infor current user
Router.get('/user/current-user', middleware.checkLogin, UserContorller.getDataInfor);

//update thông tin
Router.put('/user/current-user/update', middleware.checkLogin, UserContorller.updateDataInfor);

// add banking
Router.post('/user/current-user/banking', middleware.checkLogin, UserContorller.addBanking);

//book tour
Router.post('/user/current-user/booktour/:id_tour/:quantity_user', middleware.checkLogin, UserContorller.bookTour);

//get infor tour guide
Router.get('/user/guider/tour-guide', middleware.checkLogin, UserContorller.findTourforSelf);

//get infor tour for custome
Router.get('/user/current-user/get-tour-booked', middleware.checkLogin, UserContorller.getTourBooked);

//cancel Bill
Router.put('/user/current-user/get-bill/:id_bill', middleware.checkLogin, UserContorller.cancelBillBookTour);

//comment for user

Router.put('/user/current-user/:id_bill/:id_detail_tour/comment', middleware.checkLogin, UserContorller.comment)

//Admin


//get detail infor user
Router.get('/admin/admin-controller/get-data-user/detail-current-user/:id', middleware.checkLogin, AdminController.getDetailUser);

//get detail infor user and update
Router.post('/admin/admin-controller/get-data-user/detail-current-user/:id', middleware.checkLogin, AdminController.getDetailUserAndUpdate);

//get information user with pagination
Router.get('/admin/admin-controller/get-data-user', middleware.checkLogin, AdminController.getDataUser);

//get infro tour guide form admin
Router.get('/admin/admin-controller/tour-guide/:id_guide', middleware.checkLogin, AdminController.findTourGuideforAdmin);

//get all tour for admin
Router.get('/admin/admin-controller/get-all-tour', AdminController.getAllTourForAdmin);

//phân quyền dành cho admin
Router.put('/admin/admin-controller/account/update-role', middleware.checkLogin, AdminController.deRoleAccountForAdmin);

//lấy user cho việc xem tour
Router.get('/admin/admin-controller/get-guide-tour/:id_tour', middleware.checkLogin, TourController.getTourOfGuide);


//get all account by option role
Router.get('/admin/admin-controller/account/get-all/:role_account', middleware.checkLogin, AdminController.getAllAccountByOption);
module.exports = Router;