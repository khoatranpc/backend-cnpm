const bcryptjs = require('bcryptjs');
const encryptPassword = {
    //bam mat khau
    hashPassword: async (password) => {
        const salt = await bcryptjs.genSalt(10);
        const hasPassword = await bcryptjs.hash(password, salt);
        return hasPassword;
    },
    //so sanh ma hoa
    comparePassword: async (password,existedPassword) => {
        const hashedPassword = existedPassword;
        const matchedPassword = await bcryptjs.compare(password, hashedPassword);
        return matchedPassword;
    }
}

module.exports = encryptPassword;