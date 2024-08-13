import jwt from "jsonwebtoken";
import userModel from "../../../dbConnection/models/users.model.js";
import sendVerificationLink from "../../../utils/sendVerificationLink.js";
import AppError from "../../../utils/errorClass.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import bcrypt from "bcrypt";
import sendEmailOrPassword from "../../../utils/sendEmailOrPassword.js";
import companyModel from "../../../dbConnection/models/company.model.js";
import jobModel from "../../../dbConnection/models/jobs.model.js";
import applicationModel from "../../../dbConnection/models/application.model.js";
import dotenv from "dotenv"
dotenv.config()

// @desc      register
// @method     POST
// @route     /api/v1/users/signUp
// @access    Puplic
const signUp = errorAsyncHandler(async (req, res, next) => {
    const { firstName, lastName, email } = req.body;
    const userName = `${firstName} ${lastName}`;
    const user = await userModel.create({ ...req.body, userName });

    try {
        await sendVerificationLink(email);
    } catch (error) {
        next(new AppError("can not verify email", 400));
    }

    res.status(201).json({ msg: "User added successfully", user });
});

// @desc      verify email
// @method     GET
// @route     /api/v1/users/verfiyEmail/:token
// @access    Puplic
const verifyEmail = errorAsyncHandler(async (req, res, next) => {
    const email = req.email;
    const user = await userModel.findOneAndUpdate(
        { email },
        { emailConfirm: true }
    );
    if (!user) return next(new AppError("Must signup first", 400));

    res.status(202).json({ msg: "Email confirmed successfully" });
});

// @desc      signin
// @method     POST
// @route     /api/v1/users/signIn
// @access    Puplic
const signIn = errorAsyncHandler(async (req, res, next) => {
    const { data, password } = req.body;
    const user = await userModel.findOne({
        $or: [{ email: data }, { recoveryEmail: data }, { mobileNumber: data }],
    });

    if (!user)
        return next(new AppError("Wrong email or mobile number or password", 400));

    const decodePassword = bcrypt.compareSync(password, user.password);
    if (!decodePassword)
        return next(new AppError("Wrong email or password", 400));

    user.status = "online";
    user.save();

    const Token = jwt.sign({ email: user.email, userId: user._id }, process.env.SIGNIN_TOKEN_KEY);
    res.status(201).json({ msg: "User signin successfully", user, Token });
});

// @desc      update account
// @method     PATCH
// @route     /api/v1/users/:userId
// @access    Puplic
const updateAccount = errorAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
    const data = await userModel.updateOne({ _id: id }, { ...req.body });
    res.status(202).json({ msg: "User updated successfully", data });
});

// @desc      delete account
// @method     DELETE
// @route     /api/v1/users/:userId
// @access    Puplic
const deleteAccount = errorAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;

    const data = await userModel.deleteOne({ _id: id });
    
    if (data) {
        deleteRelatedCompanies(userId)
        deleteRelatedJobs(userId)
        deleteRelatedApplication(userId)
    }
    res.status(201).json({ msg: "User deleted successfully", data });
});

//@params userId(String)
const deleteRelatedCompanies = async (userId) => {
    try {
        await companyModel.deleteMany({ companyHR: userId });
    } catch (error) {
        res.status(400).json({ msg: "Can't delete related company HR", error });
    }
}

//@params userId(String)
const deleteRelatedJobs = async (userId) => {
    try {
        await jobModel.deleteMany({ addedBy: userId });
    } catch (error) {
        res.status(400).json({ msg: "Can't delete related job user", error });
    }
}

//@params userId(String)
const deleteRelatedApplication = async (userId) => {
    try {
        await applicationModel.deleteMany({ userId });
    } catch (error) {
        res.status(400).json({ msg: "Can't delete related application user", error });
    }
}

// @desc      get account data
// @method     GET
// @route     /api/v1/users/:userId
// @access    Puplic
const getAccountData = errorAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await userModel.findById(id);
    res.status(200).json({ user });
});

// @desc      get another user profile
// @method     GET
// @route     /api/v1/users/userProfile/:profileId
// @access    Puplic
const getAnotherUserProfile = errorAsyncHandler(async (req, res, next) => {
    const { profileId } = req.params;
    const user = await userModel.findById(profileId);
    if (!user) return next(new AppError("Can not find user with this id", 400));

    const { firstName, lastName, userName, DOB, mobileNumber, status } = user;
    res
        .status(200)
        .json({
            profile: { firstName, lastName, userName, DOB, mobileNumber, status },
        });
});

// @desc      update user password
// @method     PATCH
// @route     /api/v1/users/updatePassword/:userId
// @access    Puplic
const updateUserPassword = errorAsyncHandler(async (req, res, next) => {
    const { newPassword } = req.body;
    const user = req.user

    const hashPassword = bcrypt.hashSync(newPassword, 8);
    const dataUpdated = await userModel.updateOne(
        { _id: user._id },
        { password: hashPassword }
    );

    res.status(202).json({ msg: "password updated successfully", dataUpdated });
});

// @desc      forget password
// @method     POST
// @route     /api/v1/users/forgetPassword
// @access    Puplic
const forgetPassword = errorAsyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const otpCode = Math.floor(100000 + Math.random() * 900000);

    const user = await userModel.findOne({email})
    if (!user)
        return next(new AppError("Wrong user email!", 400));

    await sendEmailOrPassword(email, "password", otpCode)

    user.OTPCode = `${otpCode}`;
    user.save();

    res.status(201).json({ msg: "OTP sended sucessefully, Please check your email" });
});

// @desc      verify password
// @method     POST
// @route     /api/v1/users/verifyPassword
// @access    Puplic
const verifyPassword = errorAsyncHandler(async (req, res, next) => {
    const {OTPCode} = req.body;
    const user = req.user
    
    if (user.OTPCode !== OTPCode)
        return next(new AppError("verification code is wrong!", 400));

    user.OTPCode = "";
    user.save();
    res.status(200).json({ msg: "Password verifyed successfully" });
})

// @desc      get all users have recovery email
// @method     GET
// @route     /api/v1/users/usersWithRecoveryEmail
// @access    Puplic
const getUsersWithRecoveryEmail = errorAsyncHandler(async (req, res, next) => {
    const users = await userModel.find({recoveryEmail: {$ne: ""}});
    res.status(200).json({ length: users.length, users });
});


export {
    signUp,
    verifyEmail,
    signIn,
    updateAccount,
    deleteAccount,
    getAccountData,
    getAnotherUserProfile,
    updateUserPassword,
    forgetPassword,
    verifyPassword,
    getUsersWithRecoveryEmail
};
