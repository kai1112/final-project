const nodemailer = require('nodemailer');

async function sendMail() {
    // create reusable transporter object using the default SMTP transport
    // transport.sendMail()
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "maivanducga@gmail.com", // generated ethereal user
            pass: "rqpcynhusfxtudiw", // generated ethereal password
        },
    });

    let email = 'finalprojectk7gre@gmail.com'
    let subject = 'author created new manga'
    // send mail with defined transport object
    try {
        let info = await transporter.sendMail(
            {
                from: '<maivanducga@gmail.com>', // sender address
                to: `${email}`, // list of receivers
                subject: `${subject}`, // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            }
        );
        console.log(24, 'oke');
    } catch (e) {
        console.log(27, e);
    }
}


module.exports = { sendMail }