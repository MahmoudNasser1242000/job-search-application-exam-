import companyModel from "../../dbConnection/models/company.model.js";

const checkRelatedCompany_HR = async (req, res, next) => {
    const user = req.user;
    const companies = await companyModel.find({companyHR: user._id})
    if(!companies.length)
        return res.status(400).json({msg: "Can not add job, User must be related to a company"})

    next()
}

export default checkRelatedCompany_HR