const providerJWT = require('../modules/JWT');
require('dotenv').config();
const middleware = {
    checkLogin: async (req, res, next) => {
        try {
            const data = req.headers.authorization;
            if (data) {
                const token = data;
                const parseToken = await providerJWT.verifyToken(token, process.env.JWT_SECRET, (err, user) => {
                    if(err) throw new Error("Invalid user!")
                    
                });

                req.user = parseToken;
                console.log(req.user);
                next();

            } else {
                throw new Error("Invalid user!")
            }
        } catch (error) {
            res.status(401).send({
                error: error.message
            });
        }

    }
}
module.exports = middleware