const createOTP = ()=>{
    return Math.floor(Math.random(Math.random() * 999999) * 111111);
}
module.exports = {createOTP};