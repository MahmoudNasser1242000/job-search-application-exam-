import userModel from "../../dbConnection/models/users.model.js"

const checkMobileNumber = async (req, res, next) => {
    let {mobileNumber} = req.body;
    const user = await userModel.findOne({mobileNumber})

    if(user)
        return res.status(400).json({msg: "Mobile number allready exist"})

    next()
}

export default checkMobileNumber