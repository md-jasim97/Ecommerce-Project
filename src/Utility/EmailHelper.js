const nodemailer = require('nodemailer');

const EmailSender = async (emailTo, Emailsubject, Emailtext) => {  

    let transporter = nodemailer.createTransport({
        service: "mail.teamrabbil.com",
        // service: "mail.adbiyastravel.com",
        port: 25,
        secure: false,
        auth: {user: "info@teamrabbil.com",pass: "~sR4[bhaC[Qs"},
        // auth: {user: "info@adbiyastravel.com",pass: "MAVg6Br?i_$n"},
        tls: {rejectUnauthorized: false}
    })


    let mailOptions = {
        from: "MERN Ecommerce Site <info@adbiyastravel.com>",
        to: emailTo,
        subject: Emailsubject,
        text: Emailtext
    }

    return await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.toString());
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })
}

module.exports = EmailSender