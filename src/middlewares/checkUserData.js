import userModel from "../../dbConnection/models/users.model.js";

const checkUserData = async (req, res, next) => {
    let { email, mobileNumber, recoveryEmail } = req.body;
    const user = await userModel.findOne({
        $or: [{ email }, { mobileNumber }, { recoveryEmail }],
    });

    if (user) {
        const data =
            (email === user.email && email) ||
            (recoveryEmail === user.recoveryEmail && recoveryEmail) ||
            (mobileNumber === user.mobileNumber && mobileNumber);

        return res.status(400).json({ msg: `${data} allready exist` });
    } else {
        next();
    }
    
};

export default checkUserData;
