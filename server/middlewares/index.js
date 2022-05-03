const providerJWT = require('../modules/JWT');
require('dotenv').config();
const middleware = {
    checkLogin: async (req, res, next) => {
        try {
            const data = req.headers.authorization;
            console.log('middleware');
            if (data) {
                const token = data;
                const parseToken = await providerJWT.verifyToken(token);
                // dang fix chưa xong
                // nếu không thể verify được, thì kết quả sẽ là undefined
                if(typeof parseToken == 'undefined') throw new Error("Invalid user!")
                console.log(parseToken);
                // if (typeof parseToken == 'undefined') throw new Error("Invalid user!")
                req.user = parseToken;
                console.log(req.user);
                next();

            } else {
                throw new Error("Invalid user!")
            }
        } catch (error) {
            res.status(401).send({
                error: "Invalid user!"
            });
        }

    }
}
module.exports = middleware