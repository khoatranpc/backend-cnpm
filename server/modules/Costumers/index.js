const { userModel, bankModel, accountModel, detailBookTourModel, billModel, tourModel } = require('../../models');
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
    },
    bookTour: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid user! controller tour");
            const { id_user, role_user } = req.user;
            const { id_tour, quantity_user } = req.params;
            if (role_user !== "user") throw new Error("You are forbidden!");
            //default quantity = 1
            let quantityUser

            if (Number(quantity_user) > 1 && quantity_user) {
                quantityUser = quantity_user
            } else {
                quantityUser = 1
            }

            //tim user
            const existedUser = await userModel.findOne({ id_account: id_user });
            // lay so tien hien tai cua user
            const currentMoneyBanking = await bankModel.findOne({ id_user: existedUser.id });
            // lay thong tin tour
            const detailTour = await detailBookTourModel.findOne({ id_tour: id_tour }).populate("id_tour");
            
            const d = new Date();
            if(detailTour.date_end_tour >= d) throw new Error("Tour finished!")
       

            if (detailTour.id_tour.currenCustomer >= detailTour.id_tour.maxCostumer) throw new Error("Tour is full!")
            if (currentMoneyBanking.currentMoney < detailTour.id_tour.price) throw new Error("Your account does not have enough money!")
            //tinh tien khi thanh toan
            const currentMoneyAfterPay = Number(currentMoneyBanking.currentMoney) - Number(detailTour.id_tour.price);

            // update money in banking
            const currrentBanking = await bankModel.findOneAndUpdate({ id_user: existedUser.id }, { currentMoney: currentMoneyAfterPay });

            const billPay = {
                id_tour: id_tour,
                id_user: existedUser.id,
                money: detailTour.id_tour.price
            }
            //tạo bill và cập nhật các khách hàng tại tour
            const createBill = await billModel.create(billPay);
            const updateCurrentCostumerForTour = await tourModel.findByIdAndUpdate(detailTour.id_tour, {
                // nếu số lượng lớn hơn 1, thì sẽ trả về, còn nếu không thì sẽ mặc định là 1
                $inc: { currenCustomer: quantityUser }
            }, { new: true })
            console.log("-----");
            res.status(200).send({
                message: "Pay bill successfull!",
                bill: createBill,
                currentBanking: currrentBanking,
                detail_tour: detailTour,
                tour: updateCurrentCostumerForTour
            })
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    }
}
module.exports = CostumerController;