
const checkJobOwner = async (req, res, next) => {
    const user = req.user
    const job = req.job;

    if(user._id.toString() !== job.addedBy.toString())
        return res.status(400).json({msg: "Can only access your owm job"})

    next()
}

export default checkJobOwner