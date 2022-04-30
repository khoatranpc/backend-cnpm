require('dotenv').config();
const jwt = require('jsonwebtoken');
const providerJWT = {
    signToken: async (id_user, role_user, id_user) => {
        //payloay must be object
        const indentityData = {
            id_user: id_user,
            role_user: role_user,
            id_user: id_user
        }
        const token = await jwt.sign(indentityData, process.env.JWT_SECRET, {
            expiresIn: 10000
        });
        return token;
    },
    verifyToken: async (token) => {
        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        return verifyToken;
    }
}
module.exports = providerJWT;