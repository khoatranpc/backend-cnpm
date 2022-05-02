const { tourModel, userModel } = require('../../models');
const Tour = {
    addTour: async (req, res) => {
        try {
            const { id_user, role_user } = req.user;
            console.log(id_user);
            const tour = req.body;
            //check existedUser
            const existedUser = await userModel.findOne({ id_account: id_user });
            console.log(existedUser);
            if (!existedUser) throw new Error('You must login first!');
            if (role_user !== "admin") throw new Error('You have no right to add tour!');
            const createTour = await tourModel(req.body);
            const addedTour = await createTour.save();
            res.status(201).send({
                message: "Created tour successful",
                data: addedTour
            })
        } catch (error) {
            res.status(403).send({
                message: error.message
            })
        }
    },
    getAllTour: async (req,res) => {
        
    }

}
module.exports = Tour;