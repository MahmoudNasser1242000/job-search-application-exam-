import userModel from "../../dbConnection/models/users.model.js"
import bcrypt from "bcrypt"

const checkUserEmail = async (req, res, next) => {
    let {email, password} = req.body;
    const user = await userModel.findOne({email})

    if(user)
        return res.status(400).json({msg: "Email allready exist"})

    const hashPassword = bcrypt.hashSync(password, 8);
    req.body.password = hashPassword
    next()
}

export default checkUserEmail