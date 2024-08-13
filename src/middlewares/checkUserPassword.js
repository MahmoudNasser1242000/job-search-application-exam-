import bcrypt from "bcrypt"

const checkUserPassword = async (req, res, next) => {
    let {oldPassword} = req.body;
    const user = req.user;
    const decodePassword = bcrypt.compareSync(oldPassword, user.password)
    if(!decodePassword)
        return res.status(400).json({msg: "Wrong user password!"})

    next()
}

export default checkUserPassword