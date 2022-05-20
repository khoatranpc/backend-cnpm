const { userModel, bankModel, accountModel, detailGuideTourModel, detailBookTourModel, billModel, tourModel } = require('../../models');
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

            const existedUser = await userModel.findOneAndUpdate({ id_account: id_user }, req.body, { new: true });
            console.log("-----");
            const fetchNewData = await userModel.findById(existedUser.id);
            // nếu không phải admin hoặc user thì sẽ không thể update
            if (role_user == "admin" || role_user == "user" || role_user == "guide") {
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
            const idUser = await userModel.findOne({ id_account: id_user });
            console.log(idUser);
            const banking = {
                ...req.body,
                id_user: idUser.id
            }
            console.log(banking);
            // nếu không lưu được, là do bank king chỉ nhận 1 card number
            const createBanking = await bankModel.create(banking);
            const idBank = createBanking.id
            console.log("id này là id của banking: " + idBank);
            console.log(("đã lưu"));
            const userupdate = await userModel.findByIdAndUpdate(idUser.id, { id_bank: idBank }, { new: true });

            const userAfterUpdate = await userModel.findById(idUser.id).populate("id_bank");
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
            if (!detailTour) throw new Error("Not found Tour!")
            console.log(detailTour);
            const d = new Date();
            if (detailTour.date_end_tour >= d) throw new Error("Tour finished!")
            console.log("adudd");
            if (detailTour.id_tour.maxCustomer <= ((detailTour.id_tour.currenCustomer) + Number(quantityUser))) throw new Error("Tour is full!");

            if (detailTour.id_tour.currenCustomer >= detailTour.id_tour.maxCostumer) throw new Error("Tour is full!")
            const moneyTotal = detailTour.id_tour.price * quantityUser;
            if (currentMoneyBanking.currentMoney < moneyTotal) throw new Error("Your Bank does not have enough money!")
            //tinh tien khi thanh toan
            const currentMoneyAfterPay = Number(currentMoneyBanking.currentMoney) - Number(moneyTotal);

            // update money in banking
            const currrentBanking = await bankModel.findOneAndUpdate({ id_user: existedUser.id }, { currentMoney: currentMoneyAfterPay }, { new: true });

            const billPay = {
                id_tour: id_tour,
                id_user: existedUser.id,
                money: moneyTotal,
                totalPerson: quantityUser
            }
            //tạo bill và cập nhật các khách hàng tại tour
            const createBill = await billModel.create(billPay);
            const updateCurrentCostumerForTour = await tourModel.findByIdAndUpdate(detailTour.id_tour, {
                // nếu số lượng lớn hơn 1, thì sẽ trả về, còn nếu không thì sẽ mặc định là 1
                $inc: { currentCustomer: quantityUser }
            }, { new: true });
            console.log(updateCurrentCostumerForTour);
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
    },
    // dành cho người dẫn tour
    // lấy thông tin tour được dẫn cho người dẫn tour
    findTourforSelf: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid user! controller tour");
            const { id_user, role_user } = req.user;
            if (role_user !== "guide") throw new Error("You are forbidden!");
            const guide = await userModel.findOne({ id_account: id_user });
            if (!guide) throw new Error("Unknown Guider!");
            const findGuideTour = await detailGuideTourModel.findOne({ id_user: guide.id }).populate("id_detail_tour");
            res.status(200).send({
                message: "Found!",
                data: findGuideTour
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    // xem thông tin bill đặt tour (các tour đã đặt) dành cho khách hàng
    getTourBooked: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid user! controller tour");
            const { id_user, role_user } = req.user;
            if (role_user !== "user") throw new Error("You are forbidden!");
            const getIdUser = await userModel.findOne({ id_account: id_user });
            const dataBill = await billModel.find({ id_user: getIdUser.id });
            res.status(200).send({
                message: "Get data bill",
                bill: dataBill
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }



}
module.exports = CostumerController;