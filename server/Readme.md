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
                : put http://localhost:8000/api/tour/update/id
                ví dụ: http://localhost:8000/api/tour/update/626fefb1183dc3a6ed278046
                note: put lên các trường cần thay đổi, hoặc nếu không thì sẽ không làm gì cả