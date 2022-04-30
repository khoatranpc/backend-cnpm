const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    }, password: {
        type: String,
        required: true,
        minlength: 3
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
        default: "User"
    },
    email: {
        type: String,
    },
    phone: {
        type: String
    },
    id_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    gender: {
        type: String
    },
    place: {
        type: String
    },
    CCCD: {
        type: Number
    },
    date: {
        type: Date
    },
    id_bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserBank"
    }
})
const bankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true
    },
    currentMoney: {
        type: Number,
        required: true
    },
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfor"
    }

})

const accountModel = new mongoose.model('Account', accountSchema);
const userModel = new mongoose.model('UserInfor', userSchema);
const bankModel = new mongoose.model('UserBank', bankSchema);
module.exports = { accountModel, userModel, bankModel };