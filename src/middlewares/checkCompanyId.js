import companyModel from "../../dbConnection/models/company.model.js";

const checkCompanyId = async (req, res, next) => {
    let {companyId} = req.params;
    const company = await companyModel.findById(companyId)

    if(!company)
        return res.status(400).json({msg: "Can not find company with this id"})

    req.company = company
    next()
}

export default checkCompanyId