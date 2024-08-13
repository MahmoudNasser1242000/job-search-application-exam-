import nodemailer from "nodemailer"
import verifyEmailTemplate from "./verifyEmailTemplate.js";
import verifyPasswordTemplate from "./verifyPasswordTemplate.js";
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_SERVICES_EMAIL,
        pass: process.env.GOOGLE_SERVICES_PASSWORD,
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendEmailOrPassword(email, type, otp, token="") {
    try {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Hello from other side 👻" <mahmoudhamad1242000@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: type === "email"? verifyEmailTemplate(token, email) : verifyPasswordTemplate(otp, email), // html body
        });

        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
        // console.log(error);
    }
}

export default sendEmailOrPassword