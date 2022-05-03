require('dotenv').config();
const jwt = require('jsonwebtoken');
const providerJWT = {
    signToken: async (id_user, role_user) => {
        try {
            //payloay must be object
            const indentityData = {
                id_user: id_user,
                role_user: role_user,
            }
            const token = await jwt.sign(indentityData, process.env.JWT_SECRET, {
                expiresIn: 100000
            });
            return token;
        } catch (error) {
            return error.message
        }

    },
    verifyToken: async (token) => {
        try {
            const verifyToken = await jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) throw new Error("Invalid User!")
            });
            return verifyToken;
        } catch (error) {
            return "jwt " + error.message
        }

    }
}
module.exports = providerJWT;