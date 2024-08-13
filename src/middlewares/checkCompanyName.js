import companyModel from "../../dbConnection/models/company.model.js";

const checkCompanyName = async (req, res, next) => {
    let {companyName} = req.query;
    const company = await companyModel.findOne({companyName: {$regex: companyName}})

    if(!company)
        return res.status(400).json({msg: "Can not find company with this name"})

    req.company = company
    next()
}

export default checkCompanyName