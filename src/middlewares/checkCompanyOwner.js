
const checkCompanyOwner = async (req, res, next) => {
    const user = req.user
    const company = req.company

    if(user._id.toString() !== company.companyHR.toString())
        return res.status(400).json({msg: "Can only access your owm company"})

    next()
}

export default checkCompanyOwner