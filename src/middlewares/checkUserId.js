import userModel from "../../dbConnection/models/users.model.js"

const checkUserId = async (req, res, next) => {
    let {id} = req.params;
    let userId = req.user?._id.toString();

    const user = await userModel.findById(id)
    if(!user)
        return res.status(400).json({msg: "Can not find user with this id"})

    if (id && (userId !== id))
        return res.status(400).json({msg: "Can only access your owm account"})
    
    next()
}

export default checkUserId