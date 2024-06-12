const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve('./emailTemplates'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./emailTemplates'),
    extName: '.hbs',
};

transporter.use('compile', hbs(handlebarOptions));

const sendMail = async ({ name, email, message }) => {
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'New Contact Form Message',
        template: 'contact',
        context: { name, email, message },
    };

    const clientMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thanks for contacting us',
        template: 'thankYou',
        context: { name },
    };

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(clientMailOptions);
};

module.exports = { sendMail };
