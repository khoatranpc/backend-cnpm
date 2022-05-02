const { accountModel, userModel, otpAccountUserModel } = require('../../models/index');
const encryptPassword = require('../Bcrypt');
const providerJWT = require('../JWT');
//mailer
const mailer = require('../Mail');
// create OTP
const otp = require('../OTP');
const checkStringSpace = (str) => {
    return str.indexOf(' ') >= 0;
}
const Auth = {
    // feat Login
    SignIn: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username) throw new Error('Username is require!');
            if (!password) throw new Error('Password is require!');
            // kiem tra ton tai ta`i khoan
            const existedUsername = await accountModel.findOne({ username: username });
            if (!existedUsername) throw new Error('Wrong username or password!');
            //check password
            const comparePassword = await encryptPassword.comparePassword(password, existedUsername.password);

            if (!comparePassword) throw new Error('Wrong username or password!');

            // lay id user từ collection UserInfor
            // console.log(existedUsername._id);
            const token = await providerJWT.signToken(existedUsername._id, existedUsername.role);
            // console.log(token);
            // const signToken = await providerJWT.verifyToken(token);
            // console.log(signToken);
            // sau khi đăng nhập, server sẽ gửi về id tài khoản + role + id user
            res.status(200).send({
                status: 200,
                message: "Login successfull!",
                token: token
            });
        } catch (error) {
            res.status(401).send({
                error: error.message
            });
        }
    },
    //Dang ky
    SignUp: async (req, res) => {
        try {
            const { name, gender, indentify, address, birth, email, username, password, repassword } = req.body;
            if (!username) throw new Error('Username is require!');
            if (!password) throw new Error('Password is require!');

            if (!name) throw new Error('Name is require!');
            if (!gender) throw new Error('Gender is require!');

            if (!indentify) throw new Error('Indentify is require!');

            if (!address) throw new Error('Address is require!');
            if (!birth) throw new Error('Birth is require!');

            if (!email) throw new Error('Email is require!');

            if (username && checkStringSpace(username)) throw new Error('Username will be your login account name, it not be allow any space! ');
            if (password.length < 6) throw new Error('Password must be large 6 character!');

            if (!repassword) throw new Error('You need to re-type password!');
            if (password != repassword) throw new Error('Password is not match!');

            // tim kiem tai khoan trung
            const existedAccount = await accountModel.findOne({ username: username });
            if (existedAccount) throw new Error('Username existed. Try another!');
            //ma hoa mat khau
            const hashedPassword = await encryptPassword.hashPassword(password);
            const accountPass = {
                username: username,
                password: hashedPassword
            }
            let createOtp = otp.createOTP();
            const newAccount = await accountModel.create(accountPass);
            //tạo mã OTP cho tài khoản
            const otpModel = {
                id_account: newAccount.id,
                otp: createOtp
            }
            const createOTP = await otpAccountUserModel.create(otpModel);

            //tạo tài khoản tương ứng
            const currentInfor = {
                name: name,
                email: email,
                address: address,
                indentify: indentify,
                birth: birth,
                gender: gender,
                id_account: newAccount.id
            }
            const currentUSer = await userModel.create(currentInfor);
            res.status(201).send({
                message: "Sign Up successful!",
                currentUser: currentUSer
            })

        } catch (error) {
            res.status(401).send({
                error: error.message
            })
        }
    },
    // reset password
    requireOTP: async (req, res) => {
        try {
            const { username, email } = req.body;
            const existedEmail = await userModel.findOne({ email: email }).populate('id_account');
            //tìm email người dùng
            if (!existedEmail) throw new Error('Wrong email or username. Try again!');
            if (!username || username !== existedEmail.id_account.username)
                throw new Error('Wrong email or username. Try again!');
            // tìm mã otp ứng với account
            const otpAccount = await otpAccountUserModel.findOne({ id_account: existedEmail.id_account._id });
            // sử dụng mailer để gửi mail
            await mailer(req, res, otpAccount.otp, email);
            setTimeout(async () => {
                await otpAccountUserModel.findOneAndUpdate({ id_account: existedEmail.id_account._id }, { otp: otp.createOTP() })
            }, 30000)
            res.status(200).send({
                otp: otpAccount.otp,
                id_account: existedEmail.id_account.id,
                message: "We've send code to your email address. Please check your mail! Time limit for OTP is 3 minutes!",
            })
        } catch (error) {
            res.status(401).send({
                error: error.message
            });
        }
    },
    // resetpassword
    resetPassword: async (req, res) => {
        //clien sẽ gửi lên thêm 1 trường receivedOtp, để chắc chắn rằng đã được nhận Ot
        // và tiến hành được thay đổi mật khẩu
        // gửi lên mã otp đã nhập, id_account cần thay đổi; id_account sẽ nhận được khi gửi yêu cầu OTP lên server
        // gửi lên kèm theo mật khẩu và mật khẩu nhập lại, tiến hành validate và cập nhật
        try {
            const { receivedOtp, otp, id_account, password, repassword } = req.body;
            if (!receivedOtp)
                throw new Error('You need to verify your account information first!');
            if (!otp)
                throw new Error('You type OTP!');
            if (!id_account)
                throw new Error('Unknown email!');
            if (!password || !repassword)
                throw new Error('Password is require!');
            if (password !== repassword)
                throw new Error('Password not match!');
            const otpCurrentAccount = await otpAccountUserModel.findOne({ id_account: id_account });
            if (otp != otpCurrentAccount.otp) {
                throw new Error("Password is not match! Try again!")
            }
            const hashedPassword = await encryptPassword.hashPassword(password);
            const accountUpdate = await accountModel.findByIdAndUpdate(id_account, { password: hashedPassword });
            if (!accountUpdate)
                throw new Error('Not found email!');
            res.status(200).send({
                message: "Update password successfull!",
                data: accountUpdate
            })
        } catch (error) {
            res.status(403).send({
                error: error.message
            })
        }

    }
}
module.exports = Auth;