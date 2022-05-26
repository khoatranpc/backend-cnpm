const { tourModel, userModel, detailBookTourModel, accountModel, detailGuideTourModel } = require('../../models');
const Tour = {
    addTour: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid user! controller tour");
            const { id_user, role_user } = req.user;
            console.log(req.user);
            console.log(id_user);
            //check existedUser
            const existedUser = await userModel.findOne({ id_account: id_user });
            console.log(existedUser);
            if (!existedUser) throw new Error('You must login first!');
            if (role_user !== "admin") throw new Error('You have no right to add tour!');
            // tự động cập nhật collection tour và details tour
            const createTour = await tourModel(req.body);
            const addedTour = await createTour.save();
            const createDetailTour = await detailBookTourModel.create({ id_tour: addedTour.id });
            const createdTour = await tourModel.findByIdAndUpdate(addedTour.id, { id_detail_Tour: createDetailTour.id });
            res.status(201).send({
                message: "Created tour successful",
                data: createdTour,
                detailTour: createDetailTour
            })
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    },
    getAllTour: async (req, res) => {
        try {
            const { page } = req.query;
            //pagination
            const allTour = await tourModel.find({ status: "Activing" || "Ending" }).limit(6).skip((page - 1) * 6);
            if (!allTour) throw new Error("Sorry, we have not any tour yet!");
            res.status(200).send({
                total: allTour.length,
                data: allTour
            })
        } catch (error) {
            res.status(404).send({
                message: error.message
            })
        }

    },
    getOneTour: async (req, res) => {
        try {
            const { id } = req.params;
            let tour = await tourModel.findById(id);
            if (!tour) throw new Error("We can't find the tour!")
            res.status(200).send({
                tour: tour
            })
        } catch (error) {
            res.status(404).send({
                message: error.message
            })
        }
    },
    getTourByOption: async (req, res) => {
        try {
            const { name, place, type } = req.query;
            const rgSearch = (pattern) => new RegExp(`.*${pattern}`);
            let foundTour;
            if (name) {
                const regexTourName = rgSearch(name);
                foundTour = await tourModel.find({
                    tourName: { $regex: regexTourName, $options: "i" }
                });
                if (!foundTour) throw new Error("We can't find the tour!");
                res.status(200).send({
                    data: foundTour
                })
            }
            if (place) {
                const regexTourPlace = rgSearch(place);
                foundTour = await tourModel.find({
                    place: { $regex: regexTourPlace, $options: "i" }
                });
                if (!foundTour) throw new Error("We can't find the tour!");
                res.status(200).send({
                    data: foundTour
                })
            }
            if (type) {
                const regexTourType = rgSearch(type);
                foundTour = await tourModel.find({
                    type: { $regex: regexTourType, $options: "i" }
                });
                if (!foundTour) throw new Error("We can't find the tour!");
                res.status(200).send({
                    data: foundTour
                })
            }

        } catch (error) {
            res.status(404).send({
                message: error.message
            })
        }

    },
    updateTour: async (req, res) => {
        try {
            const { id_user, role_user } = req.user;
            const { id } = req.params;

            console.log(id_user);
            //check existedUser
            const existedUser = await userModel.findOne({ id_account: id_user });
            console.log(existedUser);
            if (!existedUser) throw new Error('You must login first!');
            if (role_user !== "admin") throw new Error('You have no right to update tour!');
            //update các trường tương ứng với object được gửi từ client : req.body
            await tourModel.findByIdAndUpdate(id, req.body, { new: true })
            const updatedTour = await tourModel.findById(id);
            res.status(201).send({
                message: "Update tour successful",
                data: updatedTour
            })
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    },
    deleteTour: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid User")
            const { id_user, role_user } = req.user;
            const { id } = req.params;
            console.log(req.user);
            //check existedUser
            const existedUser = await userModel.findOne({ id_account: id_user });
            console.log(existedUser);
            if (!existedUser) throw new Error('You must login first!');
            if (role_user !== "admin") throw new Error('You have no right to delete tour!');
            //xóa tour với id tương ứng

            const checkStatus = await tourModel.findById(id);
            if (!checkStatus) throw new Error('Not found this tour!');
            if (checkStatus.status !== "Pending") {
                throw new Error('Can not delete this tour!');
            }
            await checkStatus.remove();
            res.status(201).send({
                message: "Delete tour successful",
                data: checkStatus
            })
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    },
    getDetailTour: async (req, res) => {
        try {
            const { id } = req.params;
            let tour = await tourModel.findById(id).populate('id_detail_Tour');
            if (!tour) throw new Error("We can't find the tour!")
            const d = new Date();
            let tourUpdateStatus;
            if (tour.id_detail_Tour.date_end_tour < d) {
                tourUpdateStatus = await tourModel.findByIdAndUpdate(id, { status: "Ending" }, { new: true })
            }
            res.status(200).send({
                tour: tour
            })
        } catch (error) {
            res.status(404).send({
                message: error.message
            })
        }
    },
    // for admn
    getDetailTourAndUpdate: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid User")
            const { id_user, role_user } = req.user;
            const { id_tour } = req.params;
            console.log(req.user);
            //check existedUser
            const existedUser = await userModel.findOne({ id_account: id_user });

            if (!existedUser) throw new Error('You must login first!');
            if (role_user !== "admin") throw new Error('You have no right to add tour guide!');
            const detailTour = await detailBookTourModel.findOneAndUpdate({ id_tour: id_tour }, req.body, { new: true });
            res.status(200).send({
                message: "Update successfull!",
                data: detailTour
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    // thêm người dẫn tour vào 1 tour
    addTourGuide: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid User")
            const { id_user, role_user } = req.user;
            const { id_tour } = req.params;
            const { id_guide } = req.body;
            //check existedUser
            const existedUser = await userModel.findOne({ id_account: id_user });

            if (!existedUser) throw new Error('You must login first!');
            if (role_user !== "admin") throw new Error('You have no right to add tour guide!');
            // find user with role = guide
            const findTourGuide = await userModel.findById(id_guide).populate("id_account");
            if (!findTourGuide) throw new Error('Not found user!');
            if (findTourGuide.id_account.role !== "guide") throw new Error('This user cannot be added to the tour!');


            const detailGuideTour = await detailGuideTourModel.findOne({ id_user: findTourGuide.id }).populate("id_detail_tour");
            console.log(detailGuideTour);
            if (!detailGuideTour) {
                // lưu luôn vào db
                const addGuideTour = await detailGuideTourModel({
                    id_user: id_guide,
                    id_detail_tour: []
                })
                const added = await addGuideTour.save();
                const addTour = await detailGuideTourModel.findById(added.id);
                console.log("Đây là addTour", addTour);
                const update = await addTour.updateOne({ $push: { id_detail_tour: id_tour } }, { new: true });
                res.status(200).send({
                    message: "Thêm thành công",
                    data: update
                })
            }
            else {
                const findDetailTour = await detailBookTourModel.findOne({ id_tour: id_tour });
                detailGuideTour.id_detail_tour.map(async (item, index) => {
                    try {
                        const detail = await detailBookTourModel.findById(item.id_detail_Tour);
                        console.log(detail);
                        // cần test thêm
                        console.log(detail.date_end_tour < findDetailTour.date_begin_tour);
                        if (detail.date_end_tour < findDetailTour.date_begin_tour) {
                            const addTour = await detailGuideTourModel.findOne({ id_user: id_guide });
                            await addTour.updateOne({ $push: { id_detail_tour: id_tour } });
                            res.status(200).send({
                                message: "Thêm thành công"
                            })
                        } else {
                            throw new Error("Không thêm được! Do người dẫn tour trùng lịch");
                        }
                    } catch (error) {
                        res.status(500).send({
                            message: error.message
                        })
                    }
                })
            }
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    // lấy thông tin người dẫn tour có id tour trùng với id tour cần xem
    getTourOfGuide: async (req, res) => {
        try {
            if (!req.user) throw new Error("Invalid User")
            const { id_user, role_user } = req.user;
            const { id_tour } = req.params;
            console.log(req.user);
            //check existedUser
            const existedUser = await userModel.findOne({ id_account: id_user });

            if (!existedUser) throw new Error('You must login first!');
            if (role_user !== "admin") throw new Error('You have no right to add tour guide!');
            // get user
            const user = await detailGuideTourModel.findOne({ id_detail_tour: id_tour }).populate("id_user");
            res.status(200).send({
                data: user
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

}
module.exports = Tour;