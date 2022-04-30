const { accountModel,userModel } = require('../../models/index');
const encryptPassword = require('../Bcrypt');
const providerJWT = require('../JWT');
const checkStringSpace = (str) => {
    return str.indexOf(' ') >= 0;
}
const Auth = {
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
    // feat signin
    SignUp: async (req, res) => {
        try {
            const { username, password, repassword } = req.body;
            if (!username) throw new Error('Username is require!');
            if (!password) throw new Error('Password is require!');
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
            const newAccount = await accountModel.create(accountPass);
            res.status(201).send({
                message: "Sign Up successful!",
            })
        } catch (error) {
            res.status(401).send({
                error: error.message
            })
        }

    }
}
module.exports = Auth;