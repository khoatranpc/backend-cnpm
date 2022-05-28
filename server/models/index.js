const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }, password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        default: "user"
    }, id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfor"
    }
})
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "User",
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: ''
    },
    id_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    indentify: {
        type: Number,
        required: true
    },
    birth: {
        type: Date,
        required: true
    },
    id_bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserBank"
    }
})
const otpAccountUserSchema = new mongoose.Schema({
    id_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    otp: {
        type: Number,
        required: true
    }
})
const bankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    currentMoney: {
        type: Number,
        required: true,
        default: 0
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfor"
    }

})
const billSchema = new mongoose.Schema({

    id_tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour"
    },
    money: {
        type: Number,
        default: 0,
        required: true
    },
    methodBill: {
        type: String,
        default: "Banking"
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfor"
    },
    datePay: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        default: "Compelete"
    },
    totalPerson: {
        type: Number
    }
})

const tourSchema = new mongoose.Schema({
    tourName: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: "https://media.vneconomy.vn/images/upload/2022/01/20/du-lich.jpg"
    },
    maxCustomer: {
        type: Number,
        default: 30
    },
    currentCustomer: {
        type: Number,
        default: 0
    },
    intro: {
        type: String,
        default: "Đây là tour du lịch"
    },
    dayUpdate: {
        type: Date,
        default: Date.now()
    },
    typeTour: {
        type: String,
        default: "Du lịch biển"
    },
    supplierTour: {
        type: String,
        default: "Nhóm 1 Đẹp trai"
    },
    status: {
        type: String,
        default: "Pending"
    },
    id_detail_Tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "detailTour"
    }
})
const detailBookTourSchema = new mongoose.Schema({
    id_tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour"
    },
    reviews_tour: {
        type: String,
        default: "There are no reviews yet, be the first to review it!"
    },
    date_begin_tour: {
        type: Date,
        required: true,
        default: Date.now()
    },
    date_end_tour: {
        type: Date,
        required: true,
        default: Date.now()
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommentTour"
        }
    ]
})
const detailGuideTourSchema = new mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfor"
    },
    id_detail_tour: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour"
        },
    ],
})
const userCommentTourSchema = new mongoose.Schema({
    id_detail_tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "detailTour",
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfor",
    },
    comments:
    {
        type: String,
    }
})

const accountModel = new mongoose.model('Account', accountSchema);
const userModel = new mongoose.model('UserInfor', userSchema);
const bankModel = new mongoose.model('UserBank', bankSchema);
const otpAccountUserModel = new mongoose.model('otpAccount', otpAccountUserSchema);
const billModel = new mongoose.model("Bill", billSchema);
const tourModel = new mongoose.model("Tour", tourSchema);
const detailBookTourModel = new mongoose.model("detailTour", detailBookTourSchema);
const detailGuideTourModel = new mongoose.model("detailGuideTour", detailGuideTourSchema);
const userCommentTourModel = new mongoose.model("CommentTour", userCommentTourSchema);
module.exports = {
    accountModel, userModel, bankModel, otpAccountUserModel, billModel, tourModel,userCommentTourModel, detailBookTourModel, detailGuideTourModel
};