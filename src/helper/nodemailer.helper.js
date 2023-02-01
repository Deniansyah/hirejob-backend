const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'peworld1222@gmail.com',
        pass: 'vvpjyalmjaljvijr',
    }
})

module.exports = transporter