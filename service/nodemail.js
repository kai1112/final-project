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


// const nodemailer = require('nodemailer');

// let sendMail = async () => {
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: "maivanducga@gmail.com", // generated ethereal user
//             pass: "rqpcynhusfxtudiw", // generated ethereal password
//         },
//     });

//     // let a = dataSent.data.map(item => {
//     //     return (
//     //         ${ item.email },
//     //       )
//     // })

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '<maivanducga@gmail.com>', // sender address
//         to: 'finalprojectk7gre@gmail.com', // list of receivers
//         subject: "New Status ✔", // Subject line
//         text: "Hello world?", // plain text body
//         // html: `<h2>Hello Qa Manager !</h2>
//         //         <div><b>Staff ${dataSent.name} id number ${dataSent.id} has post a new Status</b></div>
//         //         <div>Have a nice day !!</div>
//         // `, // html body
//     });
// }


// // async..await is not allowed in global scope, must use a wrapper
// async function main() {

// }



// main().catch(console.error);
// module.exports = { sendSimpleEmail, sendSimpleEmail1 }







module.exports = { sendMail }