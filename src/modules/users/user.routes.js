import { Router } from "express";
import {
    deleteAccount,
    forgetPassword,
    getAccountData,
    getAnotherUserProfile,
    getUsersWithRecoveryEmail,
    signIn,
    signUp,
    updateAccount,
    updateUserPassword,
    verifyEmail,
    verifyPassword,
} from "./user.controller.js";
import checkVerificationLink from "../../middlewares/checkVerificationLink.js";
import validationSchema from "../../middlewares/validationSchema.js";
import {
    forgetPasswordValidationSchema,
    signInValidationSchema,
    signUpValidationSchema,
    updateAccountValidationSchema,
    updatePasswordValidationSchema,
    updateVerifyedPasswordValidationSchema,
    verifyPasswordValidationSchema,
} from "./user.validation.js";
import checkMobileNumber from "../../middlewares/checkUserMobile.js";
import protectAuth from "../../middlewares/protectAuthUser.js";
import checkUserId from "../../middlewares/checkUserId.js";
import checkUserData from "../../middlewares/checkUserData.js";
import checkUserPassword from "../../middlewares/checkUserPassword.js";
import checkUserEmail from "../../middlewares/checkUserEmail.js";

const userRouter = Router();

//create new account:
// 1-check data validation
// 2-check if email or mobile number exist
// 3-signup user
userRouter.post(
    "/signUp",
    validationSchema(signUpValidationSchema),
    checkMobileNumber,
    checkUserEmail,
    signUp
);

//send email:
// 1-check if email exist by useing token
// 2-verify email
userRouter.get("/verfiyEmail/:token", checkVerificationLink, verifyEmail);

//signin:
// 1-validate data
// 2-login user by checking token first
userRouter.post("/signIn", validationSchema(signInValidationSchema), signIn);

//get users profile:
// 1-check if user is login
// 2-get other users profile
userRouter.get("/userProfile/:profileId", protectAuth, getAnotherUserProfile);

//update password:
// 1-check if user is login and if user exist
// 2-check user password
// 3-validate old and new password and confirm new password
// 4-update user password
userRouter.patch(
    "/updatePassword",
    protectAuth,
    validationSchema(updatePasswordValidationSchema),
    checkUserPassword,
    updateUserPassword
);

//forget password:
// 1-validate user email
// 2-send otp code
userRouter.post(
    "/forgetPassword",
    validationSchema(forgetPasswordValidationSchema),
    forgetPassword
);

//verify password:
// 1-check if user is login
// 2-validate new password and confirm it
// 3-send otp code
userRouter.post(
    "/verifyPassword",
    protectAuth,
    validationSchema(verifyPasswordValidationSchema),
    verifyPassword
);

//update verifyed password:
// 1-check if user is login
// 2-validate new password and confirm it
// 3-update password
userRouter.patch(
    "/updateVerifyedPassword",
    protectAuth,
    validationSchema(updateVerifyedPasswordValidationSchema),
    updateUserPassword
);

//users with recovery emails:
// 1-check if user is login
// 2-get all users have recovery email
userRouter.get(
    "/usersWithRecoveryEmail",
    protectAuth,
    getUsersWithRecoveryEmail
);

//update account:
// 1-check if user is login
// 2-check if user exist by id
// 3-check unique data exist
// 4-validate user data
// 5-update account

//delete account:
// 1-check if user is login
// 2-check if user exist by id
// 3-delete account

//get account data:
// 1-check if user is login
// 2-check if user exist by id
// 3-view account
userRouter.route("/:id")
    .patch(
        protectAuth,
        checkUserId,
        validationSchema(updateAccountValidationSchema),
        checkUserData,
        updateAccount
    )
    .delete(protectAuth, checkUserId, deleteAccount) 
    .get(protectAuth, checkUserId, getAccountData)

export default userRouter;
