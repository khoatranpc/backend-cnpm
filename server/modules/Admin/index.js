const {
    accountModel, userModel, bankModel, otpAccountUserModel, billModel, tourModel, detailBookTourModel
} = require('../../models');
const AdminController = {
    getDataUser: async (req, res) => {
        //check role
        try {
            const { id_user, role_user } = req.user;
            const { page } = req.query;
            if (!id_user || !role_user) throw new Error("You must to be login first!");
            if (role_user !== "admin") throw new Error("You are forbidden!");
            const allUserAndPagination = await userModel.find().limit(10).skip((page - 1) * 10);
            if (!allUserAndPagination) throw new Error("Have not user yet!");
            res.status(200).send({
                total: allUserAndPagination.length,
                data: allUserAndPagination
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getDetailUser: async (req, res) => {
        try {
            const { id_user, role_user } = req.user;
            if (!id_user || !role_user) throw new Error("You must to be login first!");
            if (role_user !== "admin") throw new Error("You are forbidden!");
            const { id } = req.params;
            const foundUser = await userModel.findById(id).populate("id_bank");
            if (!foundUser) throw new Error("We can not found this user!");
            res.status(200).send({
                data: foundUser
            })
        } catch (error) {
            res.status(404).send({
                message: error.message
            })
        }


    }
}
module.exports = AdminController