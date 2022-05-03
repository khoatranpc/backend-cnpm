const { userModel } = require('../../models');
const CostumerController = {
    // lấy xông tin cá nhân
    getDataInfor: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid user! controller tour");
            const { id_user, role_user } = req.user;
            const existedUser = await userModel.findOne({ id_account: id_user });
            console.log(role_user == "admin");
            if (role_user == "admin" || role_user == "user" || role_user == "guide") {
                res.status(200).send({
                    data: existedUser,
                    role: role_user
                })
            } else {
                throw new Error('You are forbidden!');
            }
            if (!existedUser) throw new Error('You must login first!');

        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    },
    // sửa thông tin cá nhân
    updateDataInfor: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid user! controller tour");
            const { id_user, role_user } = req.user;

            const existedUser = await userModel.findOneAndUpdate({ id_account: id_user }, req.body);
            console.log("-----");
            const fetchNewData = await userModel.findById(existedUser.id);
            // nếu không phải admin hoặc user thì sẽ không thể update
            if (role_user == "admin" || role_user == "user") {
                res.status(200).send({
                    message: "Update successfull!",
                    data: fetchNewData,
                    role: role_user
                })
            } else {
                throw new Error('You are forbidden!');
            }
            if (!existedUser) throw new Error('You must login first!');

        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    }
}
module.exports = CostumerController;