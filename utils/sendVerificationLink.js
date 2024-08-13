import jwt from "jsonwebtoken";
import sendEmailOrPassword from "./sendEmailOrPassword.js";
import dotenv from "dotenv"
dotenv.config()

const sendVerificationLink = async (email) => {
    const Token = jwt.sign({email}, process.env.VERIFICATION_LINK_TOKEN_KEY);
    return await sendEmailOrPassword(email, "email", "", Token);
}

export default sendVerificationLink;