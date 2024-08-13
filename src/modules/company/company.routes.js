import { Router } from "express";
import {
    addCompany,
    collectApplicationWithCompany,
    deleteCompany,
    getCompanyDataWithJobs,
    getJobApplicationByOwner,
    searchCompanyName,
    updateCompany,
} from "./company.controller.js";
import protectAuth from "../../middlewares/protectAuthUser.js";
import { checkHrRole } from "../../middlewares/checkHrRole.js";
import validationSchema from "../../middlewares/validationSchema.js";
import {
    addCopmanyValidationSchema,
    addExcelSheetWithDate,
    updateCopmanyValidationSchema,
} from "./company.validation.js";
import checkCompanyEmailOrName from "../../middlewares/checkCompanyEmailOrName.js";
import checkCompanyId from "../../middlewares/checkCompanyId.js";
import checkCompanyOwner from "../../middlewares/checkCompanyOwner.js";
import checkJobOwner from "../../middlewares/checkJobOwner.js";
import checkJobId from "../../middlewares/checkJobId.js";

const companyRouter = Router();

//add company:
// 1-check if user is login
// 2-check user role (company_HR)
// 3-validate copmany data
// 4-check if company unique name and email are exist
// 5-update account
companyRouter.post(
    "/",
    protectAuth,
    checkHrRole,
    validationSchema(addCopmanyValidationSchema),
    checkCompanyEmailOrName,
    addCompany
);

//search company:
// 1-check if user is login
// 2-search for company with name
companyRouter.get("/searchCompany", protectAuth, searchCompanyName);

//get application:
// 1-check if user is login
// 2-check user role (company_HR)
// 3-check if job exist by id
// 4-check if logged user is job owner
// 5-get job application
companyRouter.get(
    "/getJobApplicationByOwner/:jobId",
    protectAuth,
    checkHrRole,
    checkJobId,
    checkJobOwner,
    getJobApplicationByOwner
);

//collect applications:
// 1-check if user is login
// 2-check user role (company_HR)
// 3-check if copmany exist by id
// 4-validate date
// 5-get applications related to jobs and create excel sheet file
companyRouter.post(
    "/collectApplicationsWithCopmany/:companyId",
    protectAuth,
    checkHrRole,
    checkCompanyId,
    checkCompanyOwner,
    validationSchema(addExcelSheetWithDate),
    collectApplicationWithCompany
);

//update company:
// 1-check if user is login
// 2-check user role (company_HR)
// 3-check if company unique name and email are exist
// 4-check if logged user is company owner
// 5-validate copmany data
// 6-check if unique company email or name exist 
// 7-update company

//delete company:
// 1-check if user is login
// 2-check user role (company_HR)
// 3-check if company unique name and email are exist
// 4-check if logged user is company owner
// 5-delete company

//get company data:
// 1-check if user is login
// 2-check user role (company_HR)
// 3-check if company unique name and email are exist
// 4-check if logged user is company owner
// 5-view company data
companyRouter
    .route("/:companyId")
    .patch(
        protectAuth,
        checkHrRole,
        checkCompanyId,
        checkCompanyOwner,
        validationSchema(updateCopmanyValidationSchema),
        checkCompanyEmailOrName,
        updateCompany
    )
    .delete(
        protectAuth,
        checkHrRole,
        checkCompanyId,
        checkCompanyOwner,
        deleteCompany
    )
    .get(
        protectAuth,
        checkHrRole,
        checkCompanyId,
        checkCompanyOwner,
        getCompanyDataWithJobs
    );
export default companyRouter;
