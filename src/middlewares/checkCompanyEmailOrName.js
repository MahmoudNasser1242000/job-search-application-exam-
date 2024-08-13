import companyModel from "../../dbConnection/models/company.model.js";

const checkCompanyEmailOrName = async (req, res, next) => {
    let {companyEmail, companyName} = req.body;

    const company = await companyModel.findOne({
        $or: [{companyEmail}, {companyName}]
    })

    if (company) {
        const data =
            (companyEmail === company.companyEmail && companyEmail) ||
            (companyName === company.companyName && companyName);

        return res.status(400).json({ msg: `${data} allready exist` });
    } else {
        next();
    }
}

export default checkCompanyEmailOrName