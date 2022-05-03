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
                console.log(parseToken);
                console.log('inside middleware');
                // if (typeof parseToken == 'undefined') throw new Error("Invalid user!")
                req.user = parseToken;
                console.log('đây là đau');
                next();

            } else {
                throw new Error("Invalid user!")
            }
        } catch (error) {
            res.status(401).send({
                error: "Lỗi ở middle " + error.message
            });
        }

    }
}
module.exports = middleware