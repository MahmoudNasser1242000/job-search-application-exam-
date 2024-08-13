import jwt from "jsonwebtoken";
import userModel from "../../dbConnection/models/users.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

export const protectAuth = errorAsyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        const decodeToken = jwt.verify(token, "userLogin");
        if (decodeToken.userId && decodeToken.email) {
            const user = await userModel.findOne({
                $and: [{ email: decodeToken.email }, { _id: decodeToken.userId }],
            });

            req.user = user;
            next();
        } else {
            res
                .status(403)
                .json({ msg: "You are not login, Please login to access this route" });
        }
    } else {
        res
            .status(403)
            .json({ msg: "You are not login, Please login to access this route" });
    }
});

export default protectAuth
