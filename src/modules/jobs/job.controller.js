import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import jobModel from "../../../dbConnection/models/jobs.model.js";
import applicationModel from "../../../dbConnection/models/application.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import AppError from "../../../utils/errorClass.js";

// @desc      add job
// @method     POST
// @route     /api/v1/jobs/
// @access    Company_HR
const addJob = errorAsyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const job = await jobModel.create({ ...req.body, addedBy: userId });

    res.status(201).json({ msg: "Job added successfully", job });
});

// @desc      update job
// @method     PATCH
// @route     /api/v1/jobs/:jobId
// @access    Company_HR
const updateJob = errorAsyncHandler(async (req, res, next) => {
    const { jobId } = req.params;
    const data = await jobModel.updateOne({ _id: jobId }, { ...req.body });

    res.status(202).json({ msg: "Job updated successfully", data });
});

// @desc      delete job
// @method     DElete
// @route     /api/v1/jobs/:jobId
// @access    Company_HR
const deleteJob = errorAsyncHandler(async (req, res, next) => {
    const { jobId } = req.params;
    const data = await jobModel.deleteOne({ _id: jobId });

    deleteAllRelatedJobApplications(jobId)
    res.status(202).json({ msg: "Job deleted successfully", data });
});

//@params jobId(String)
const deleteAllRelatedJobApplications = async (jobId) => {
    try {
        await applicationModel.deleteMany({ jobId });
    } catch (error) {
        res.status(400).json({ msg: "Can't delete related application job", error });
    }
}

// @desc      get jobs
// @method     GET
// @route     /api/v1/jobs/
// @access    Public
const getAllJobs = errorAsyncHandler(async (req, res, next) => {
    const jobs = await jobModel.find().populate({
        path: "addedBy",
        select: "firstName lastName userName email DOB mobileNumber role -_id",
    });

    res.status(200).json({ length: jobs.length, jobs });
});

// @desc      get all jobs with specific copmany
// @method     GET
// @route     /api/v1/jobs/getJobsWithCompany
// @access    Public
const getAllJobsWithSpecificCompany = errorAsyncHandler(
    async (req, res, next) => {
        const company = req.company;
        const jobs = await jobModel.find({ addedBy: company.companyHR });

        res.status(200).json({ length: jobs.length, jobs });
    }
);

// @desc      jobs filtering
// @method     GET
// @route     /api/v1/jobs/jobsFiltering
// @access    Public
const jobsFiltering = errorAsyncHandler(async (req, res, next) => {
    const {
        workingTime,
        jobLocation,
        seniorityLevel,
        jobTitle,
        technicalSkills,
    } = req.query;
    const filter = {};
    if (workingTime) {
        filter.workingTime = {
            $regex: new RegExp(
                workingTime.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
                "i"
            ),
        };
    }
    if (jobLocation) {
        filter.jobLocation = {
            $regex: new RegExp(
                jobLocation.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
                "i"
            ),
        };
    }
    if (seniorityLevel) {
        filter.seniorityLevel = {
            $regex: new RegExp(
                seniorityLevel.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
                "i"
            ),
        };
    }
    if (jobTitle) {
        filter.jobTitle = {
            $regex: new RegExp(
                jobTitle.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
                "i"
            ),
        };
    }
    if (technicalSkills) {
        filter.technicalSkills = {
            $regex: new RegExp(
                technicalSkills.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),
                "i"
            ),
        };
    }

    const jobs = await jobModel.find(filter);
    res.status(200).json({ length: jobs.length, jobs });
});

// @desc      add application
// @method     POST
// @route     /api/v1/jobs/addJobApplication/:jobId
// @access    User
const addUserApplication = errorAsyncHandler(async (req, res, next) => {
    const { jobId } = req.params;
    const user = req.user;

    const {public_id, secure_url} = await cloudinary.uploader.upload(req.file.path, {
        folder: "Job Application Resume",
        use_filename: true,
    });
    const application = await applicationModel.create({
        userId: user._id,
        jobId,
        ...req.body,
        userResume: {public_id, secure_url}
    });

    if (!application) {
        await cloudinary.uploader.destroy(public_id)
        return next(new AppError("Can not create user, please try again!", 400))
    }
    res.status(201).json({ msg: "Apllication added successfully", application });
});

export {
    addJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getAllJobsWithSpecificCompany,
    jobsFiltering,
    addUserApplication,
};
