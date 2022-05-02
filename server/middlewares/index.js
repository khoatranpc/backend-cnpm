const providerJWT = require('../modules/JWT');
require('dotenv').config();
const middleware = {
    checkLogin: async (req, res, next) => {
        const data = req.headers.authorization;
        if (data) {
            const token = data;
            const parseToken = await providerJWT.verifyToken(token, process.env.JWT_SECRET);
            req.user = parseToken;
            console.log(req.user);
            next();
            // providerJWT.verifyToken(token, process.env.JWT_SECRET, (err, user) => {
            //     if (err) {
            //         return res.sendStatus(403);
            //     }
            //     req.user = user;
            //     console.log("Middleware check admin");
            //     next();
            // });
        } else {
            res.sendStatus(401);
        }
    }
}
module.exports = middleware