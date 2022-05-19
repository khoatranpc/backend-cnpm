### Cách dùng api
-- API đăng nhập: post http://localhost:8000/api/auth/login
                + gửi lên các trường: username, password
                
                
-- API đăng ký: post http://localhost:8000/api/auth/signup
                + gửi lên các trường: username, password, repassword (repassword có ý nghĩa là nhập lại mật khẩu)
                
                
-- API yêu cầu mã OTP: post http://localhost:8000/api/auth/sending-otp
                + gửi lên các trường: username, email
                
                
-- API reset mật khẩu: put http://localhost:8000/api/auth/reset-password
                + gửi lên các trường:  "receivedOtp":true,
                                        "otp"
                                        "id_account"
                                        "password"
                                        "repassword"
                                        
                                        
-- API thêm 1 tour dành cho role = admin: post: http://localhost:8000/api/tour/add-tour
                + gửi lên các trường: tourname, place, price
                + đính kèm header authoriztion là mã token được trả về khi đăng nhập
                
                
-- API lấy tất cả tour (đã có phân trang, sử dụng query url) : get
                + tự động lấy 5 tour 1 trang
                http://localhost:8000/api/tour/get-all-tour
                + lấy các trang khác
                http://localhost:8000/api/tour/get-all-tour?page= số trang cần lấy
                
-- API lấy 1 tour khi có id: get http://localhost:8000/api/tour/id
                +sử dụng params
                +note: id là id tour: ví dụ:
                        http://localhost:8000/api/tour/626fa01ab4f65979a10422a5

-- API lấy tour sử dụng query với otpion: name,place,type
                : get http://localhost:8000/api/tour/search?place=sơn

-- API update tour: sử dụng truyền params, method put 
                + đính kèm header authoriztion là mã token được trả về khi đăng nhập
                : put http://localhost:8000/api/tour/update/id
                ví dụ: http://localhost:8000/api/tour/update/626fefb1183dc3a6ed278046
                note: put lên các trường cần thay đổi, hoặc nếu không thì sẽ không làm gì cả

-- API xem chi tiết đặt tour: truyền params là id
                : get http://localhost:8000/api/tour/detail/id
                ví dụ: http://localhost:8000/api/tour/detail/6270afc965ba1bb975bcdf2c

-- API delete tour: sử dụng params truyền id, method delete với quyền admin
                + đính kèm header authoriztion là mã token được trả về khi đăng nhập
                : delete http://localhost:8000/api/tour/delete/id
                ví dụ: http://localhost:8000/api/tour/delete/626fea3cabb1fbe3784b2d8d
                : delete http://localhost:8000/api/tour/delete/id
                         kết quả luôn là successfull!

-- API update thông tin user dành cho admin hoặc user:
                put http://localhost:8000/api/user/current-user/update

-- API thêm ngân hàng: đính kèm headers authorization trường token tài khoản, post lên các trường: bankName, cardNumber
        post http://localhost:8000/api/user/current-user/banking

-- API book tour: truyền params là id_tour, quantity_user là số người
        post:
        http://localhost:8000/api/user/current-user/booktour/6270afc965ba1bb975bcdf2c/5

------admin-----
-- API lấy thông danh sách user với phân trang: gửi lên headers authorization
        +get: http://localhost:8000/api/admin/admin-controller/get-data-user?page=1

-- API lấy thông tin chi tiết user: truyền params là id
        +get :
http://localhost:8000/api/admin/admin-controller/get-data-user/detail-current-user/id
        ví dụ
        +http://localhost:8000/api/admin/admin-controller/get-data-user/detail-current-user/6271417aa86977f0e51b5b32
-- API cập nhật thông tin cơ bản cho user: truyền params là id
        +post vào link lấy thông tin chi tiết user
        +gửi lên các trường: 
        //updateInfor, updateAccount, updateBanking là  object
            // updateInfor nhận các trường : 
            //      name: 
            //      email:
            //      phone: string
            //      gender: 
            //      address: 
            //      birth: Date
            //      indentify: number

            // updateAccount nhận các trường :
            //      username:
            //      password: 
            //      role:

            // updateBanking nhận các trường:
            // bankName: 
            // cardNumber: (Number)
            // currentMoney: (Number)

        http://localhost:8000/api/admin/admin-controller/get-data-user/detail-current-user/6271417aa86977f0e51b5b32

-- API thêm người dãn tour vào 1 tour:
        truyền params id_tour, body gửi lên là id_guide
        put: http://localhost:8000/api/tour/add-Tour-Guide/ id_tour

        
-- API lấy thông tin tour dẫn của người dẫn tour:
        get: http://localhost:8000/api/admin/admin-controller/tour-guide/:id_guide
        gửi params: id_guide là id của người dẫn tour

// cần thêm API hủy đặt tour cho người dùng, xem danh sách tour được dẫn với guide

-- API xem thông tin tour được dẫn dành cho guide đã đăng nhập
        get: http://localhost:8000/api/user/guider/tour-guide
        đính kèm token được trả về sau khi đăng nhập

-- API phân quyền:
        admin cần phải đằng nhập, đính kèm token trên headers, authorization
        Put: 
        http://localhost:8000/api/admin/admin-controller/account/update-role
        các trường gửi lên: id_account, role_update
-- API lấy danh sách tài khoản theo option
        đính kèm header authorization
        có 3 quyền có thể lấy được: admin, user, guide
        get: http://localhost:8000/api/admin/admin-controller/account/get-all/ role cần lấy
        ví dụ: http://localhost:8000/api/admin/admin-controller/account/get-all/guide