const { response } = require('express');
const { userModel, detailBookTourModel, bankModel, accountModel } = require('../../models');
const CostumerController = {
    // lấy xông tin cá nhân
    getDataInfor: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid user! controller tour");
            const { id_user, role_user } = req.user;
            const existedUser = await userModel.findOne({ id_account: id_user }).populate("id_bank");
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
    },
    addBanking: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid user! controller tour");
            const { id_user, role_user } = req.user;
            const { bankName, cardNumber } = req.body;
            console.log("day la addbanking");
            if (role_user !== "user") throw new Error("You are forbidden!")
            if (!bankName) throw new Error("Bank name is required!")
            if (!cardNumber) throw new Error("Card number is required!")
            //user trước khi update
            //check card number trung
            const existedCardNumber = await bankModel.findOne({ cardNumber: cardNumber });
            if (existedCardNumber) throw new Error('Try again another Card number!');
            const idUser = await accountModel.findById(id_user);
            console.log(idUser);
            const banking = {
                ...req.body,
                id_user: idUser.id_user
            }
            // nếu không lưu được, là do bank king chỉ nhận 1 card number
            const createBanking = await bankModel.create(banking);
            const idBank = createBanking.id
            console.log("id này là id của banking: " + idBank);
            console.log(("đã lưu"));
            await userModel.findByIdAndUpdate(idUser.id_user, { id_bank: idBank });

            const userAfterUpdate = await userModel.findById(idUser.id_user).populate("id_bank");
            res.status(200).send({
                user: userAfterUpdate
            })
        } catch (err) {
            res.status(403).send({
                message: err.message
            })
        }
    }
    // bookTour: async (req, res) => {
    //     if (!req.user) throw new Error("Invalid user! controller tour");
    //     const { id_user, role_user, id_tour } = req.user;

    //     const bookTour = await detailBookTourModel.findOne({ id_tour: id_tour });
    //     // nếu không phải admin hoặc user thì sẽ không thể update
    //     if (role_user == "user") {

    //         res.status(200).send({
    //             message: "Update successfull!",
    //             data: fetchNewData,
    //             role: role_user
    //         })
    //     } else {
    //         throw new Error('You are forbidden!');
    //     }
    // }
}
module.exports = CostumerController;