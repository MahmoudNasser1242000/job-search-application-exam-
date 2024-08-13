import userModel from "../../../dbConnection/models/users.model.js";
import AppError from "../../../utils/errorClass.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import companyModel from "../../../dbConnection/models/company.model.js";
import jobModel from "../../../dbConnection/models/jobs.model.js";
import applicationModel from "../../../dbConnection/models/application.model.js";
import writeXlsxFile from "write-excel-file/node"

// @desc      add company
// @method     POST
// @route     /api/v1/company/
// @access    Company_HR
const addCompany = errorAsyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const company = await companyModel.create({ ...req.body, companyHR: userId });

    res.status(201).json({ msg: "Company added successfully", company });
});

// @desc      update company
// @method     PATCH
// @route     /api/v1/company/:companyId
// @access    Company_HR
const updateCompany = errorAsyncHandler(async (req, res, next) => {
    const { companyId } = req.params
    const data = await companyModel.updateOne(
        { _id: companyId },
        { ...req.body }
    );

    res.status(202).json({ msg: "Company updated successfully", data });
});

// @desc      delete company
// @method     DELETE
// @route     /api/v1/company/:companyId
// @access    Company_HR
const deleteCompany = errorAsyncHandler(async (req, res, next) => {
    const { companyId } = req.params
    const data = await companyModel.deleteOne({ _id: companyId });

    res.status(202).json({ msg: "Company deleted successfully", data });
});

// @desc      search for company with name
// @method     GET
// @route     /api/v1/company/searchCompany
// @access    Public
const searchCompanyName = errorAsyncHandler(async (req, res, next) => {
    const { name } = req.query
    const company = await companyModel.findOne({ companyName: { $regex: name } });

    res.status(200).json({ company });
});

// @desc      get company data with jobs 
// @method     GET
// @route     /api/v1/company/:companyId
// @access    Company_HR
const getCompanyDataWithJobs = errorAsyncHandler(async (req, res, next) => {
    const { companyId } = req.params
    const company = await companyModel.findById(companyId);

    if (!company)
        return next(new AppError("Can not find company with this id", 400));

    const jobs = await jobModel.find({ addedBy: company.companyHR });
    res.status(200).json({ company: { ...company._doc, jobs: {length: jobs.length, jobs} } });
});

// @desc      get job application by owner
// @method     GET
// @route     /api/v1/company/checkJobApplicationByOwner/:jobId
// @access    Company_HR
const getJobApplicationByOwner = errorAsyncHandler(async (req, res, next) => {
    const { jobId } = req.params
    const application = await applicationModel.find({ jobId }).populate({
        path: "userId",
        select: "firstName lastName userName email DOB mobileNumber role -_id",
    });

    if (!application.length)
        return next(new AppError("Can not find application with this job", 400));

    res.status(200).json({ jobApplication: application });
});

// @desc      get application related to jobs and create excel sheet file
// @method     POST
// @route     /api/v1/company/collectApplicationsWithCopmany/:companyId",
// @access    Company_HR
const collectApplicationWithCompany = errorAsyncHandler(async (req, res, next) => {
    const { date } = req.body
    const company = req.company
    const jobs = await getJobsByCopmpanyHR(company.companyHR)

    const jobsIds = jobs.map((job) => job._id);
    const applications = await applicationModel.find({
        jobId: { $in: [...jobsIds] }
    })

    if (!applications.length)
        return next(new AppError("Can not find applications with this job", 400));

    createExcelSheet(date, company)
    res.status(200).json({ length: applications.length, applications });
});

//@param companyHR(Id)
//@return jobs (Array of objects)
const getJobsByCopmpanyHR = async (companyHR) => {
    try {
        const jobs = await jobModel.find({ addedBy: companyHR });
        return jobs
    } catch (error) {
        res.status(400).json({ msg: "Can not get jobs", error });
    }
}

//@param data(Date), copmany(Object)
const createExcelSheet = async (date, company) => {
    try {
        const company_HR = await userModel.findOne({ _id: company.companyHR });
        const data = [
            [
                { value: "Date", fontWeight: 'bold' },
                { value: "CompanyName", fontWeight: 'bold' },
                { value: "CompanyEmail", fontWeight: 'bold' },
                { value: "company_HR", fontWeight: 'bold' },
            ], [
                { type: String, value: date },
                { type: String, value: company.companyName },
                { type: String, value: company.companyEmail },
                { type: String, value: company_HR.email },
            ]]

            const columns = [
                { width: 30 },
                { width: 30 },
                { width: 45 },
                { width: 45 },
            ];
        writeXlsxFile(data, {
            columns,
            filePath: 'Excel_Sheet/job_Application_Date.xlsx'
        });
    } catch (error) {
        res.status(400).json({ msg: "Can not create excel sheet with this data", error });
    }
}

export {
    addCompany,
    updateCompany,
    deleteCompany,
    searchCompanyName,
    getCompanyDataWithJobs,
    getJobApplicationByOwner,
    collectApplicationWithCompany
};
