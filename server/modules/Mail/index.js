const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'khoatranpc603@gmail.com',
        pass: 'mdockoodfbuosgjj'
    }
})
const mailOptionsOTP = (otp, email) => {
    return {
        from: 'khoatranpc603@gmail.com',
        to: email,
        subject: 'The OTP verify your account!',
        html: `<strong>Do not share this OTP</strong> <br/> ${otp}`
    };
}

const mailer = (req, res, otp, email) => {
    transporter.sendMail(mailOptionsOTP(otp, email), (error, info) => {
        if (error) {
            console.log(error);
            res.end();
        } else {
            console.log('Email sent: ' + info.response);
            res.end();
        }
    })
}
module.exports = mailer;