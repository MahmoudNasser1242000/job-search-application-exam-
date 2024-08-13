import { Router } from "express";
import {
    addJob,
    addUserApplication,
    deleteJob,
    getAllJobs,
    getAllJobsWithSpecificCompany,
    jobsFiltering,
    updateJob,
} from "./job.controller.js";
import protectAuth from "../../middlewares/protectAuthUser.js";
import { checkHrRole } from "../../middlewares/checkHrRole.js";
import {
    addJobValidationSchema,
    updateJobValidationSchema,
} from "./job.validation.js";
import validationSchema from "../../middlewares/validationSchema.js";
import checkJobId from "../../middlewares/checkJobId.js";
import checkJobOwner from "../../middlewares/checkJobOwner.js";
import checkCompanyName from "../../middlewares/checkCompanyName.js";
import { checkUserRole } from "../../middlewares/checkUserRole.js";
import {fileUploadHost} from "../../middlewares/multer.js";
import checkRelatedCompany_HR from "../../middlewares/checkRelatedCompany_HR.js";

const jobRouter = Router();

//add job:
// 1-check if user is login
// 2-check user role (company_HR)
// 3-check company_HR exists by id
// 4-validate copmany data
// 5-add new job
jobRouter.post(
    "/",
    protectAuth,
    checkHrRole,
    checkRelatedCompany_HR,
    validationSchema(addJobValidationSchema),
    addJob
);

//get all jobs:
// 1-check if user is login
// 2-view all jobs
jobRouter.get("/", protectAuth, getAllJobs);

//get jobs with copmany:
// 1-check if user is login
// 2-check company name exist
// 4-get jobs with specific copmany by company_HR
jobRouter.get(
    "/getJobsWithCompany",
    protectAuth,
    checkCompanyName,
    getAllJobsWithSpecificCompany
);

//job filtering:
// 1-check if user is login
// 2-filter jobs
jobRouter.get("/jobsFiltering", protectAuth, jobsFiltering);

//add application:
// 1-check if user is login
// 2-check user role (User)
// 4-check if job exist by id
// 4-uplode resume pdf
// 5-add new job application
jobRouter.post(
    "/addJobApplication/:jobId",
    protectAuth,
    checkUserRole,
    checkJobId,
    // fileUpload().single("userResume"),
    fileUploadHost().single("userResume"),
    addUserApplication
);

//update job:
// 1-check if user is login
// 2-check user role (company_HR)
// 4-check if job exist by id
// 4-check if logged user is job owner
// 4-validate job data
// 5-update job

//delete job:
// 1-check if user is login
// 2-check user role (company_HR)
// 4-check if job exist by id
// 4-check if logged user is job owner
// 5-delete job
jobRouter
    .route("/:jobId")
    .patch(
        protectAuth,
        checkHrRole,
        checkJobId,
        checkJobOwner,
        validationSchema(updateJobValidationSchema),
        updateJob
    )
    .delete(protectAuth, checkHrRole, checkJobId, checkJobOwner, deleteJob);

export default jobRouter;
